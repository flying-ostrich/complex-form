
export type FCParams = Parameters<FunctionalComponent>

export type LogicContext<FormModel> =FCParams[1] & {
  renderParams?: Readonly<Record<string, any>>;
  model?: FormModel;
}

export type RenderContext<FormModel> = LogicContext<FormModel>;

export type LogicHandler<FormModel> = (props: FCParams[0], ctx: LogicContext<FormModel>) => RenderContext<FormModel>;
export type Render<FormModel> = (props: FCParams[0], ctx: RenderContext<FormModel>) => any;


export declare type EzFormItemType = 'item' | 'group';
export interface FormComponentProps<FormModel> extends Record<string, any> {
  logicHandler: LogicHandler<FormModel>;
  render: Render<FormModel>;
  model: FormModel;
}

export interface FormInstance<FormModel> {
  changeFormData(field: keyof FormModel, value: any): void
}


// 定义基础表单项接口
export interface EzBaseFormItem<FormModel> {
  logicHandler: LogicHandler<FormModel>;
  render: Render<FormModel>;
  type: EzFormItemType;
}

// 表单分组类型
export interface EzFormGroup<FormModel> extends EzBaseFormItem<FormModel> {
  children: (EzFormGroup<FormModel> | EzFormItem<FormModel>)[];
  type: 'group';
}

// 表单项类型
export interface EzFormItem<FormModel> extends EzBaseFormItem<FormModel> {
  fieldName: keyof FormModel; // 修改了名称
  type: 'item';
}


export type EzFormFactoryCfgLayer<FormModel> = EzFormGroup<FormModel> | EzFormItem<FormModel>;

// 表单工厂方法配置（即配置表单项｜表单组的内容）
export type EzFormFactoryCfg<FormModel> = EzFormFactoryCfgLayer<FormModel>[]