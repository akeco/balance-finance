import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CategoriesAndFinances = {
  __typename?: 'CategoriesAndFinances';
  categories: Array<Category>;
  grossProfit?: Maybe<Array<TotalType>>;
  netIncome?: Maybe<Array<TotalType>>;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['Float'];
  id: Scalars['ID'];
  name: Scalars['String'];
  subjects?: Maybe<Array<Maybe<Subject>>>;
  total?: Maybe<Array<Maybe<TotalType>>>;
  updatedAt: Scalars['Float'];
};

export type Month = {
  __typename?: 'Month';
  createdAt: Scalars['Float'];
  date: Scalars['Float'];
  id: Scalars['ID'];
  subject: Subject;
  total: Scalars['Float'];
  transactions?: Maybe<Array<Maybe<Transaction>>>;
  updatedAt: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateTransaction: Scalars['Boolean'];
};

export type MutationUpdateTransactionArgs = {
  categoryId: Scalars['String'];
  monthId: Scalars['String'];
  subjectId: Scalars['String'];
  transactionId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  grossProfit?: Maybe<Array<TotalType>>;
  netIncome?: Maybe<Array<TotalType>>;
  transactions?: Maybe<Array<Transaction>>;
};

export type QueryTransactionsArgs = {
  categoryId: Scalars['String'];
  monthId: Scalars['String'];
  subjectId: Scalars['String'];
};

export type Subject = {
  __typename?: 'Subject';
  category: Category;
  createdAt: Scalars['Float'];
  id: Scalars['ID'];
  months?: Maybe<Array<Maybe<Month>>>;
  name: Scalars['String'];
  updatedAt: Scalars['Float'];
};

export type Subscription = {
  __typename?: 'Subscription';
  categoryUpdated: CategoriesAndFinances;
  grossProfitUpdated?: Maybe<Array<TotalType>>;
  netIncomeUpdated?: Maybe<Array<TotalType>>;
};

export type TotalType = {
  __typename?: 'TotalType';
  balance: Scalars['Float'];
  date: Scalars['Float'];
};

export type Transaction = {
  __typename?: 'Transaction';
  balance: Scalars['Float'];
  company: Scalars['String'];
  createdAt: Scalars['Float'];
  description: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['Float'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CategoriesAndFinances: ResolverTypeWrapper<CategoriesAndFinances>;
  Category: ResolverTypeWrapper<Category>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Month: ResolverTypeWrapper<Month>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subject: ResolverTypeWrapper<Subject>;
  Subscription: ResolverTypeWrapper<{}>;
  TotalType: ResolverTypeWrapper<TotalType>;
  Transaction: ResolverTypeWrapper<Transaction>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CategoriesAndFinances: CategoriesAndFinances;
  Category: Category;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Month: Month;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Subject: Subject;
  Subscription: {};
  TotalType: TotalType;
  Transaction: Transaction;
};

export type CategoriesAndFinancesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CategoriesAndFinances'] = ResolversParentTypes['CategoriesAndFinances'],
> = {
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  grossProfit?: Resolver<Maybe<Array<ResolversTypes['TotalType']>>, ParentType, ContextType>;
  netIncome?: Resolver<Maybe<Array<ResolversTypes['TotalType']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  createdAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subjects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Subject']>>>, ParentType, ContextType>;
  total?: Resolver<Maybe<Array<Maybe<ResolversTypes['TotalType']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MonthResolvers<ContextType = any, ParentType extends ResolversParentTypes['Month'] = ResolversParentTypes['Month']> = {
  createdAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  subject?: Resolver<ResolversTypes['Subject'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  transactions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Transaction']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  updateTransaction?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTransactionArgs, 'categoryId' | 'monthId' | 'subjectId' | 'transactionId'>
  >;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  grossProfit?: Resolver<Maybe<Array<ResolversTypes['TotalType']>>, ParentType, ContextType>;
  netIncome?: Resolver<Maybe<Array<ResolversTypes['TotalType']>>, ParentType, ContextType>;
  transactions?: Resolver<
    Maybe<Array<ResolversTypes['Transaction']>>,
    ParentType,
    ContextType,
    RequireFields<QueryTransactionsArgs, 'categoryId' | 'monthId' | 'subjectId'>
  >;
};

export type SubjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subject'] = ResolversParentTypes['Subject']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  months?: Resolver<Maybe<Array<Maybe<ResolversTypes['Month']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription'],
> = {
  categoryUpdated?: SubscriptionResolver<ResolversTypes['CategoriesAndFinances'], 'categoryUpdated', ParentType, ContextType>;
  grossProfitUpdated?: SubscriptionResolver<Maybe<Array<ResolversTypes['TotalType']>>, 'grossProfitUpdated', ParentType, ContextType>;
  netIncomeUpdated?: SubscriptionResolver<Maybe<Array<ResolversTypes['TotalType']>>, 'netIncomeUpdated', ParentType, ContextType>;
};

export type TotalTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TotalType'] = ResolversParentTypes['TotalType']> = {
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  company?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CategoriesAndFinances?: CategoriesAndFinancesResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Month?: MonthResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subject?: SubjectResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TotalType?: TotalTypeResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
};
