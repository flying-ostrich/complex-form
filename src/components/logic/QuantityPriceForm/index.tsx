import { ref } from 'vue';
import { LogicHandler, EzForm } from '../../../AxzoEzForm/core'
import { quantityPriceFormRender } from '../../../components/mobile-ui/quantityPriceFormRender'
import FieldPricingMethod from '../FieldPricingMethod'
import GroupQuantityPrice from '../GroupQuantityPrice'

interface QuantityPriceFormModel {
  pricingMethod: string;
}


export default () => {
  const model = ref<QuantityPriceFormModel>({
    pricingMethod: 'aaa'
  });

  const logicHandler: LogicHandler = (_, ctx) => {
    return ctx
  }

  return (
    <EzForm model={model} logicHandler={logicHandler} render={quantityPriceFormRender} >
      <GroupQuantityPrice>
        <FieldPricingMethod></FieldPricingMethod>
      </GroupQuantityPrice>
    </EzForm>
  )
}
