import { reactive } from 'vue';
import { LogicHandler, useEzForm } from '../../../AxzoEzForm/core'
import { quantityPriceFormRender } from '../../../components/mobile-ui/quantityPriceFormRender'
import FieldPricingMethod from '../FieldPricingMethod'
import GroupQuantityPrice from '../GroupQuantityPrice'
import { QuantityPriceFormModel } from '../../types';



export default () => {
  const { EzForm } = useEzForm<QuantityPriceFormModel>();
  const model = reactive<QuantityPriceFormModel>({
    pricingMethod: 'aaa'
  });


  const logicHandler: LogicHandler<QuantityPriceFormModel> = (_, ctx) => {
    return { ...ctx, model }
  }

  return (
    <EzForm model={model} logicHandler={logicHandler} render={quantityPriceFormRender} >
      <GroupQuantityPrice>
        <FieldPricingMethod></FieldPricingMethod>
      </GroupQuantityPrice>
    </EzForm>
  )
}
