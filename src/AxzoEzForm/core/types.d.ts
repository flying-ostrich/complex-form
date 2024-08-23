
export type FCParams = Parameters<FunctionalComponent>

export type LogicContext<FormModel> = FCParams[1] & {
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
  name?: string;
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


/************************************表单插件********************************************/

export type PluginLogicContext<FormModel> = FCParams[1] & {
  renderParams?: Record<string, any>;
  model?: FormModel;
}

export type PluginRenderContext<FormModel> = FCParams[1] & {
  renderParams?: Readonly<Record<string, any>>;
  model?: FormModel;
}

export type EzFormItemPluginLogicHandler<FormModel> = (
  props: FCParams[0],
  ctx: PluginLogicContext<FormModel>
) => {
  props: FCParams[0],
  ctx: PluginLogicContext<FormModel>
};

export type EzFormItemPluginRender<FormModel> = (props: FCParams[0], ctx: RenderContext<FormModel>, el: JSX.Element[] | null) => {
  props: FCParams[0],
  ctx: PluginRenderContext<FormModel>,
  el: JSX.Element[]
};

export type FormDecoratorType = 'FieldDecoratorPlugin' | 'ExtraFieldPlugin';
/**
 * 表单项装饰器插件
 * 用于装饰指定的表单项，即向表单项前/后插入一些组件或处理逻辑
 */
export interface EzFormItemDecoratorPlugin<FormModel> {
  decorateItemName: string; // 需要被装饰的表单项名称
  logicHandler: EzFormItemPluginLogicHandler<FormModel>
  render: EzFormItemPluginRender<FormModel>
  type: 'ItemDecoratorPlugin'
}

/**
 * 额外表单项插件
 * 用于向表单中添加额外的表单项
 */
export interface EzFormExtraFieldPlugin<FormModel> extends EzBaseFormItem<FormModel> {
  position: {
    name: string; // 表单项名称
    insert: 'before' | 'after' // 插入到DOM 前/后
  },
  type: 'ExtraFieldPlugin'
}

// 表单插件
export type EzFormPlugin<FormModel> = EzFormExtraFieldPlugin<FormModel> | EzFormItemDecoratorPlugin<FormModel>;