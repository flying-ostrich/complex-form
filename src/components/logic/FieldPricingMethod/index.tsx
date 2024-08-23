import { computed } from 'vue'
import { PRICE_METHOD_OPTION } from '../../const'
import { QuantityPriceFormModel } from '../../types'
import { LogicHandler } from '../../../AxzoEzForm/core/types'


const fieldPricingMethodHandler: LogicHandler<QuantityPriceFormModel> = (_, ctx) => {
  // 处理计价方式类型按钮显示逻辑
  const pricingMethodBtns = computed(() => {
    return PRICE_METHOD_OPTION
  })
  const handleChangePriceMethod = () => {
    console.log('AAAAAAAA')
  }
  return {
    ...ctx,
    renderParams: {
      pricingMethodBtns,
      handleChangePriceMethod
    }
  }
}

export { fieldPricingMethodHandler }
