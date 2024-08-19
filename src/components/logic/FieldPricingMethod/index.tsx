import { computed, ref } from 'vue'
import EzFormItem from '../../../AxzoEzForm/core/EzFormItem'
import { LogicHandler } from '../../../AxzoEzForm/core/componentFactory'
import { pricingMthodFieldRender } from '../../../components/ui'
import { PRICE_METHOD_OPTION } from '../../const'

export default () => {
  const logicHandler:LogicHandler = (_, ctx) => {
    // 处理计价方式类型按钮显示逻辑
    const pricingMethodBtns = computed(() => {
      return PRICE_METHOD_OPTION
    })

    return {
      ...ctx,
      pricingMethodBtns
    }
  }
  return (
    <EzFormItem logicHandler={logicHandler} render={pricingMthodFieldRender}></EzFormItem>
  )
}
