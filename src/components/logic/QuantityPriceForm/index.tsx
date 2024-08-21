import { nextTick, reactive } from 'vue';
import { pricingMthodFieldRender, quantityPriceFormRender } from '../../ui';
import { QuantityPriceFormModel } from '../../types';
import { LogicHandler, useEzFormFactory } from '../../../AxzoEzForm';
import { fieldPricingMethodHandler } from '../FieldPricingMethod';
import { EzFormFactoryCfg } from '../../../AxzoEzForm/core/types';


export default () => {
  const formCfg:EzFormFactoryCfg<QuantityPriceFormModel> = reactive([
    {
      type: 'item',
      render: pricingMthodFieldRender,
      logicHandler: fieldPricingMethodHandler,
      fieldName:'pricingMethod',
    }
  ]);
  const { EzForm } = useEzFormFactory<QuantityPriceFormModel>(formCfg);

  nextTick(()=>{
    formCfg.push({
      type: 'item',
      render: pricingMthodFieldRender,
      logicHandler: fieldPricingMethodHandler,
      fieldName:'pricingMethod',
    })
  })

  const model = reactive<QuantityPriceFormModel>({
    pricingMethod: 'aaa'
  });


  const logicHandler: LogicHandler<QuantityPriceFormModel> = (_, ctx) => {
    return { ...ctx, model }
  }

  return (
    <EzForm model={model} logicHandler={logicHandler} render={quantityPriceFormRender} />
  )
}
