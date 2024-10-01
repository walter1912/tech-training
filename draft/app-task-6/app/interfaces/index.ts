export interface PricingRule {
  id?: number;
  name: string;
  priority: number;
  status: string;
  scopeType: string;
  customPriceType: string;
  customPrice: number;
  shop: string;
  createAt?: Date;
  startDate?: Date;
  endDate?: Date;
  scopeList?: ScopeList[];
}

export interface ScopeList {
  id?: number;
  value: string;
  PricingRuleId?: number;
  allInfor?: object;
}
export const initPricingRule: PricingRule = {
  name: "",
  priority: 0,
  status: "",
  scopeType: "",
  customPriceType: "",
  customPrice: 0,
  shop: "",
};
export const initScopeList: ScopeList = {
  value: "",
};
