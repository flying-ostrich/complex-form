import { Field } from 'vant'
import { Render } from '../../../AxzoEzForm/core/componentFactory'
import styles from './pricingMethodFieldRender.module.css'
import { QuantityPriceFormModel } from '../../types'

const pricingMthodFieldRender: Render<QuantityPriceFormModel> = (_, ctx) => {
  debugger
  const { pricingMethodBtns, handleChangePriceMethod } = ctx.renderParams || {};
  return (
    <Field center label="计价方式" name="pricingMethod" class={styles['pricing-method-field']}>
      {
        {
          input: () => (
            <div class={styles["btn-radio-box"]}>
              {
                pricingMethodBtns?.value?.map((btn: any) => {
                  return (
                    <div
                      onClick={handleChangePriceMethod}
                      class={[
                        styles['payment-method-btn'],
                        'flex-align-justify-center',
                        btn.disabled ? 'disabled' : ''
                      ]}>{btn.label}</div>
                  )
                })
              }
            </div>
          )
        }
      }
    </Field>
  )
}
export { pricingMthodFieldRender }
