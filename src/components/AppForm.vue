<template>
  <form class="form" @submit.prevent="submitForm">
    <p v-if="formErrorText" class="form-error">{{ formErrorText }}</p>
    <p v-if="formSuccessText" class="form-success">{{ formSuccessText }}</p>
    <label class="label" for="name">
      <input v-model="nameInput" class="input" type="text" placeholder="Ваше имя" name="name" />
      <span v-if="nameIsValid" class="input-valid">
        <SvgIcon icon-name="check" />
      </span>
    </label>
    <label class="label" for="email">
      <input v-model="emailInput" class="input" type="text" placeholder="Ваше email" name="email" />
      <span v-if="emailIsValid" class="input-valid">
        <SvgIcon icon-name="check" />
      </span>
    </label>
    <label class="label" for="phone">
      <input
        v-model="phoneNumberInput"
        v-maska="'+7 (###) ###-##-##'"
        class="input"
        type="tel"
        placeholder="Ваш телефон"
        name="phone"
      />
      <span v-if="phoneNumberIsValid" class="input-valid">
        <SvgIcon icon-name="check" />
      </span>
    </label>
    <AppButton :disabled="!fieldsIsValid" type="submit" variant="accent">{{ buttonText }}</AppButton>
  </form>
</template>

<script lang="ts" setup>
import AppButton from '@/components/ui/AppButton.vue'
import SvgIcon from '@/components/ui/SvgIcon.vue'
import { ICartProduct } from '@/interfaces'
import { useCartStore } from '@/store/cart'
import { useQuizStore } from '@/store/quiz'
import { formatPhoneNumber, validateEmail } from '@/utils/utils'
import axios from 'axios'
import { vMaska } from 'maska/vue'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const props = defineProps<{
  cartData?: ICartProduct[]
  quizData?: object
  url: string
  buttonText: string
  orderNumber?: number
}>()

const emit = defineEmits<{
  (e: 'form-submitted', value: boolean): void
}>()

const nameInput = ref('')
const emailInput = ref('')
const phoneNumberInput = ref('')

const formErrorText = ref('')
const formSuccessText = ref('')

const nameIsValid = computed(() => nameInput.value.length >= 2)
const emailIsValid = computed(() => validateEmail(emailInput.value))
const phoneNumberIsValid = computed(() => formatPhoneNumber(phoneNumberInput.value).length === 11)
const fieldsIsValid = computed(() => nameIsValid.value && emailIsValid.value && phoneNumberIsValid.value)

const { cartList } = storeToRefs(useCartStore())
const { quizData: quizAnswers } = storeToRefs(useQuizStore())

const setFormMessage = (error: string | null, success: string | null) => {
  formErrorText.value = error || ''
  formSuccessText.value = success || ''
  if (error) setTimeout(() => (formErrorText.value = ''), 5000)
  if (success) setTimeout(() => (formSuccessText.value = ''), 5000)
}

const sendRequest = async (data: object) => {
  try {
    const res = await axios.post(props.url, data)
    if (res.data.id > 0) {
      emit('form-submitted', true)
      setFormMessage(null, 'Спасибо! Наш менеджер скоро свяжется с вами!')
      nameInput.value = ''
      emailInput.value = ''
      phoneNumberInput.value = ''
      if (props.cartData) cartList.value = []
      if (props.quizData) quizAnswers.value = {}
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    setFormMessage('Произошла ошибка при отправке формы', null)
  }
}

const submitForm = async () => {
  if (!fieldsIsValid.value) {
    setFormMessage('Пожалуйста, заполните все поля корректно!', null)
    return
  }

  let requestData: object = {
    name: nameInput.value,
    email: emailInput.value,
    phone: formatPhoneNumber(phoneNumberInput.value),
  }

  if (props.cartData) {
    requestData = {
      ...requestData,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      orderData: props.cartData.map(({ imageUrl, oldPrice, discount, ...rest }) => rest),
      orderNumber: props.orderNumber,
    }
  } else if (props.quizData) {
    requestData = {
      ...requestData,
      quizData: props.quizData,
    }
  }

  await sendRequest(requestData)
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &.disabled {
    pointer-events: none;
    opacity: 0.6;
  }
}

.form,
.label,
.input {
  width: 100%;
}

.label {
  position: relative;
}

.input {
  border-radius: var(--radius);
  padding: 24px 16px;
  font: var(--font-16_400);
  color: var(--dark);

  &::placeholder {
    color: var(--gray);
  }
}

.input-valid {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);

  svg {
    width: 24px;
    height: 24px;
    fill: var(--accent);
  }
}

.form-success,
.form-error {
  font: var(--font-14_400);
  text-align: center;
}

.form-error {
  color: var(--accent);
}

.form-success {
  color: var(--white);
}

@media (width <= 1024px) {
  .input {
    padding: 16px;
  }
}
</style>
