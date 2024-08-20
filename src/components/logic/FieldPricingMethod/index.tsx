import { computed } from 'vue'
import { useEzForm } from '../../../AxzoEzForm/core'
import { LogicHandler } from '../../../AxzoEzForm/core/componentFactory'
import { pricingMthodFieldRender } from '../../../components/ui'
import { PRICE_METHOD_OPTION } from '../../const'
import { QuantityPriceFormModel } from '../../types'

export default () => {
  const {EzFormItem} =useEzForm<QuantityPriceFormModel>();
  const logicHandler: LogicHandler<QuantityPriceFormModel> = (_, ctx) => {
    // 处理计价方式类型按钮显示逻辑
    const pricingMethodBtns = computed(() => {
      return PRICE_METHOD_OPTION
    })
    const handleChangePriceMethod = ()=>{
      console.log('AAAAAAAA')
    }
    return {
      ...ctx,
      renderParams:{
        pricingMethodBtns,
        handleChangePriceMethod
      }
    }
  }
  return (
    <EzFormItem name={'pricingMethod'} logicHandler={logicHandler} render={pricingMthodFieldRender}></EzFormItem>
  )
}
