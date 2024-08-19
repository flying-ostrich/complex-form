import { LogicHandler } from '../../../AxzoEzForm/core/componentFactory'
import EzForm from '../../../AxzoEzForm/core/EzForm'
import FieldPricingMethod from '../FieldPricingMethod'
import { quantityPriceFormRender } from '../../../components/mobile-ui/quantityPriceFormRender'

export default () => {
  const logicHandler:LogicHandler = (_, ctx) => {
    return ctx
  }
  return (
        <EzForm logicHandler={logicHandler} render={quantityPriceFormRender} >
            <FieldPricingMethod></FieldPricingMethod>
        </EzForm>
  )
}
