/* 9cc09a72c47cb73ec26bcd0f0f381cb7f3a73e56
 * This file is automatically generated by graphql-let. */

import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    JSON: any;
    JSONObject: any;
    /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    Date: any;
    /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    DateTime: any;
};
export declare enum LoaderType {
    HasMany = "HAS_MANY",
    HasOne = "HAS_ONE",
    Join = "JOIN"
}
export declare enum RestMethods {
    Del = "del",
    Get = "get",
    Patch = "patch",
    Post = "post",
    Put = "put"
}
export declare enum Modules {
    MessageProxy = "messageProxy",
    PaymentProcessing = "paymentProcessing",
    Fraud = "fraud",
    Reporting = "reporting"
}
export declare enum Versions {
    V1 = "v1",
    V2 = "v2",
    V3 = "v3",
    V4 = "v4"
}
export declare enum Services {
    AcceptancesService = "AcceptancesService",
    AccountBalancesService = "AccountBalancesService",
    AchBatchesService = "AchBatchesService",
    AchEntriesService = "AchEntriesService",
    AchReturnReportsService = "AchReturnReportsService",
    AchReturnsService = "AchReturnsService",
    AchReversalsService = "AchReversalsService",
    BankAccountsService = "BankAccountsService",
    BillingAddressesService = "BillingAddressesService",
    EnrollmentsService = "EnrollmentsService",
    EntityLinkingsService = "EntityLinkingsService",
    EntitiesService = "EntitiesService",
    FraudAssessmentsService = "FraudAssessmentsService",
    InstoreCartsService = "InstoreCartsService",
    InstoreAnalyticsTokensService = "InstoreAnalyticsTokensService",
    MessageProxyService = "MessageProxyService",
    PaymentsService = "PaymentsService",
    PaymentMethodsService = "PaymentMethodsService",
    PreAuthsService = "PreAuthsService",
    RegistrationService = "RegistrationService",
    RetailerEnrollmentsService = "RetailerEnrollmentsService",
    WidgetUrlService = "WidgetUrlService"
}
export declare enum Checker {
    CheckLimits = "checkLimits"
}
export declare enum Transform {
    CheckoutTransform = "checkoutTransform"
}
export declare enum PlusDataLoaders {
    BrandLoader = "brandLoader",
    ProductLoader = "productLoader"
}
/** Used to determine pricing for items in a checkout */
export declare enum PricingType {
    Medical = "MEDICAL",
    Recreational = "RECREATIONAL"
}
/** Used to determine the fulfillment option of a checkout */
export declare enum OrderType {
    CurbsidePickup = "CURBSIDE_PICKUP",
    Delivery = "DELIVERY",
    DriveThruPickup = "DRIVE_THRU_PICKUP",
    InStorePickup = "IN_STORE_PICKUP",
    Pickup = "PICKUP",
    Kiosk = "KIOSK"
}
/** Single-use container for a user's cart items + order metadata */
export type Checkout = {
    __typename?: 'Checkout';
    address?: Maybe<CheckoutAddress>;
    createdAt: Scalars['DateTime'];
    id: Scalars['ID'];
    items: Array<Item>;
    orderType: OrderType;
    priceSummary: PriceSummary;
    pricingType: PricingType;
    redirectUrl: Scalars['String'];
    updatedAt: Scalars['DateTime'];
};
export type CheckoutAddress = {
    __typename?: 'CheckoutAddress';
    city?: Maybe<Scalars['String']>;
    deliverable: Scalars['Boolean'];
    formatted?: Maybe<Scalars['String']>;
    geometry?: Maybe<CheckoutAddressGeometry>;
    state?: Maybe<Scalars['String']>;
    street1?: Maybe<Scalars['String']>;
    street2?: Maybe<Scalars['String']>;
    valid: Scalars['Boolean'];
    zip?: Maybe<Scalars['String']>;
};
export type CheckoutAddressGeometry = {
    __typename?: 'CheckoutAddressGeometry';
    coordinates?: Maybe<Array<Scalars['Float']>>;
    type?: Maybe<Scalars['String']>;
};
export type CheckoutAddressInput = {
    city: Scalars['String'];
    state: Scalars['String'];
    street1: Scalars['String'];
    street2?: Maybe<Scalars['String']>;
    zip: Scalars['String'];
};
/** Line item in a checkout by variant */
export type Item = {
    __typename?: 'Item';
    id: Scalars['ID'];
    errors: Array<Scalars['String']>;
    option: Scalars['String'];
    product: Product;
    productId: Scalars['String'];
    quantity: Scalars['Int'];
    valid: Scalars['Boolean'];
    isDiscounted?: Maybe<Scalars['Boolean']>;
    basePrice?: Maybe<Scalars['Float']>;
    discounts?: Maybe<ItemDiscounts>;
    taxes?: Maybe<ItemTaxes>;
};
export type ItemDiscounts = {
    __typename?: 'ItemDiscounts';
    total?: Maybe<Scalars['Int']>;
};
export type ItemTaxes = {
    __typename?: 'ItemTaxes';
    total?: Maybe<Scalars['Int']>;
    cannabis?: Maybe<Scalars['Int']>;
    sales?: Maybe<Scalars['Int']>;
};
export type PriceSummary = {
    __typename?: 'PriceSummary';
    discounts: Scalars['Int'];
    fees: Scalars['Int'];
    mixAndMatch: Scalars['Int'];
    rewards: Scalars['Int'];
    /** Total before taxes, fees, etc. */
    subtotal: Scalars['Int'];
    taxes: Scalars['Int'];
    /** Final total including taxes, fees, etc. */
    total: Scalars['Int'];
};
export type Query = {
    __typename?: 'Query';
    checkout?: Maybe<Checkout>;
    /** Get customers for a particular dispensaary. */
    customers: Array<Customer>;
    /** Get the data for a particular customer. */
    customer?: Maybe<Customer>;
    menu?: Maybe<Menu>;
    /** Get orders for a particular dispensaary. */
    orders: Array<Order>;
    /** Get the data for a particular order. */
    order?: Maybe<Order>;
    /** Get the data for a particular product. */
    product?: Maybe<Product>;
    /** Check the availability of a product at retailers within an enterprise using only the enterprise product id. */
    productAvailabilityByRetailer: Array<ProductAvailabilityByRetailer>;
    retailers: Array<Retailer>;
    retailer?: Maybe<Retailer>;
    retailersNearLocation: Array<RetailerNearLocation>;
    specials?: Maybe<Array<Maybe<Special>>>;
};
export type QueryCheckoutArgs = {
    retailerId: Scalars['ID'];
    id: Scalars['ID'];
};
export type QueryCustomersArgs = {
    retailerId: Scalars['ID'];
    filter?: Maybe<CustomersFilter>;
    pagination?: Maybe<Pagination>;
    sort?: Maybe<CustomersSort>;
};
export type QueryCustomerArgs = {
    retailerId: Scalars['ID'];
    id: Scalars['ID'];
};
export type QueryMenuArgs = {
    filter?: Maybe<MenuFilter>;
    ignoreQuantityThresholds?: Maybe<Scalars['Boolean']>;
    menuType?: Maybe<MenuType>;
    pagination?: Maybe<Pagination>;
    retailerId: Scalars['ID'];
    sort?: Maybe<MenuSort>;
};
export type QueryOrdersArgs = {
    retailerId: Scalars['ID'];
    filter?: Maybe<OrdersFilter>;
    pagination?: Maybe<Pagination>;
    sort?: Maybe<OrdersSort>;
};
export type QueryOrderArgs = {
    retailerId: Scalars['ID'];
    id: Scalars['ID'];
};
export type QueryProductArgs = {
    id: Scalars['ID'];
    retailerId: Scalars['ID'];
    ignoreQuantityThresholds?: Maybe<Scalars['Boolean']>;
};
export type QueryProductAvailabilityByRetailerArgs = {
    enterpriseProductId: Scalars['ID'];
};
export type QueryRetailerArgs = {
    id: Scalars['ID'];
};
export type QueryRetailersNearLocationArgs = {
    location: RetailersNearLocationInput;
};
export type QuerySpecialsArgs = {
    retailerId: Scalars['ID'];
};
export type Mutation = {
    __typename?: 'Mutation';
    /** Create a checkout */
    createCheckout?: Maybe<Checkout>;
    /** Add an item to a checkout */
    addItem?: Maybe<Checkout>;
    /** Remove an item from a checkout */
    removeItem?: Maybe<Checkout>;
    /** Update the quantity of an item in a checkout */
    updateQuantity?: Maybe<Checkout>;
    /** Update the settings of a checkout */
    updateCheckout?: Maybe<Checkout>;
    /** Ping the Dutchie Plus API to confirm your API key is valid. */
    ping?: Maybe<Ping>;
};
export type MutationCreateCheckoutArgs = {
    address?: Maybe<CheckoutAddressInput>;
    metadata?: Maybe<Scalars['JSON']>;
    orderType: OrderType;
    pricingType: PricingType;
    retailerId: Scalars['ID'];
};
export type MutationAddItemArgs = {
    retailerId: Scalars['ID'];
    checkoutId: Scalars['ID'];
    quantity: Scalars['Int'];
    option: Scalars['String'];
    productId: Scalars['ID'];
};
export type MutationRemoveItemArgs = {
    retailerId: Scalars['ID'];
    checkoutId: Scalars['ID'];
    itemId: Scalars['ID'];
};
export type MutationUpdateQuantityArgs = {
    retailerId: Scalars['ID'];
    checkoutId: Scalars['ID'];
    itemId: Scalars['ID'];
    quantity: Scalars['Int'];
};
export type MutationUpdateCheckoutArgs = {
    address?: Maybe<CheckoutAddressInput>;
    checkoutId: Scalars['ID'];
    metadata?: Maybe<Scalars['JSON']>;
    orderType?: Maybe<OrderType>;
    pricingType?: Maybe<PricingType>;
    retailerId: Scalars['ID'];
};
/** Return type for `ping` resolver */
export type Ping = {
    __typename?: 'Ping';
    id: Scalars['ID'];
    /** Time the ping occurred */
    time: Scalars['DateTime'];
};
/** Each product falls into one of these categories */
export declare enum Category {
    Accessories = "ACCESSORIES",
    Apparel = "APPAREL",
    Cbd = "CBD",
    Clones = "CLONES",
    Concentrates = "CONCENTRATES",
    Edibles = "EDIBLES",
    Flower = "FLOWER",
    NotApplicable = "NOT_APPLICABLE",
    Orals = "ORALS",
    PreRolls = "PRE_ROLLS",
    Seeds = "SEEDS",
    Tinctures = "TINCTURES",
    Topicals = "TOPICALS",
    Vaporizers = "VAPORIZERS"
}
/** Certain categories have subcategories to help customer's more easily find certain products */
export declare enum Subcategory {
    Default = "DEFAULT",
    Singles = "SINGLES",
    Packs = "PACKS",
    Infused = "INFUSED",
    Blunts = "BLUNTS",
    Cartridges = "CARTRIDGES",
    Pods = "PODS",
    Disposables = "DISPOSABLES",
    Bundles = "BUNDLES",
    Shatter = "SHATTER",
    LiveResin = "LIVE_RESIN",
    Wax = "WAX",
    Rosin = "ROSIN",
    Kief = "KIEF",
    Budder = "BUDDER",
    Crumble = "CRUMBLE",
    Rso = "RSO",
    Applicators = "APPLICATORS",
    Sugar = "SUGAR",
    Sauce = "SAUCE",
    Diamonds = "DIAMONDS",
    Isolate = "ISOLATE",
    InfusedFlower = "INFUSED_FLOWER",
    Hash = "HASH",
    Badder = "BADDER",
    Oil = "OIL",
    Chocolates = "CHOCOLATES",
    Gummies = "GUMMIES",
    BakedGoods = "BAKED_GOODS",
    Drinks = "DRINKS",
    CapsulesTablets = "CAPSULES_TABLETS",
    Chews = "CHEWS",
    HardCandy = "HARD_CANDY",
    Sublingual = "SUBLINGUAL",
    FrozenTreats = "FROZEN_TREATS",
    SavorySnacks = "SAVORY_SNACKS",
    CookingBaking = "COOKING_BAKING",
    Dissolvables = "DISSOLVABLES",
    Lozenges = "LOZENGES",
    Suckers = "SUCKERS",
    Balms = "BALMS",
    TopicalOils = "TOPICAL_OILS",
    Lotions = "LOTIONS",
    SticksRollOns = "STICKS_ROLL_ONS",
    TransdermalPatches = "TRANSDERMAL_PATCHES",
    BathProducts = "BATH_PRODUCTS",
    LipBalms = "LIP_BALMS",
    Soaps = "SOAPS",
    Lubricants = "LUBRICANTS",
    Suppositories = "SUPPOSITORIES",
    Unflavored = "UNFLAVORED",
    Flavored = "FLAVORED",
    Herbal = "HERBAL",
    Pet = "PET",
    Sprays = "SPRAYS",
    ShakeTrim = "SHAKE_TRIM",
    PreGround = "PRE_GROUND",
    SmallBuds = "SMALL_BUDS",
    InfusedBud = "INFUSED_BUD",
    Batteries = "BATTERIES",
    Lighters = "LIGHTERS",
    Devices = "DEVICES",
    PapersRollingSupplies = "PAPERS_ROLLING_SUPPLIES",
    GiftCards = "GIFT_CARDS",
    Grinders = "GRINDERS",
    Glassware = "GLASSWARE",
    Trays = "TRAYS",
    DabTools = "DAB_TOOLS",
    CleaningSolutions = "CLEANING_SOLUTIONS",
    StorageContainers = "STORAGE_CONTAINERS"
}
export declare enum SortDirection {
    Asc = "ASC",
    Desc = "DESC"
}
/** Pagination input for queries that return multiple results */
export type Pagination = {
    limit: Scalars['Int'];
    offset: Scalars['Int'];
};
export declare enum CustomersSortKey {
    Email = "EMAIL",
    Name = "NAME"
}
export type CustomersSort = {
    direction: SortDirection;
    key: CustomersSortKey;
};
export type MedicalCard = {
    __typename?: 'MedicalCard';
    expirationDate?: Maybe<Scalars['String']>;
    number?: Maybe<Scalars['String']>;
    photo?: Maybe<Scalars['String']>;
    state?: Maybe<Scalars['String']>;
};
export type OptIns = {
    __typename?: 'OptIns';
    marketing: Scalars['Boolean'];
    orderStatus: Scalars['Boolean'];
    specials: Scalars['Boolean'];
};
/** Paginated list of products & aggregated meta data for those products. */
export type Menu = {
    __typename?: 'Menu';
    brands: Array<Brand>;
    products: Array<Product>;
    productsCount: Scalars['Int'];
    weights: Array<Scalars['String']>;
    tags?: Maybe<Array<Scalars['String']>>;
};
export declare enum MenuSectionFilterType {
    CustomSection = "CUSTOM_SECTION",
    Specials = "SPECIALS",
    StaffPicks = "STAFF_PICKS"
}
export declare enum MenuType {
    Medical = "MEDICAL",
    Recreational = "RECREATIONAL"
}
export declare enum MenuSortKey {
    Name = "NAME",
    Popular = "POPULAR",
    Price = "PRICE",
    Potency = "POTENCY"
}
export declare enum PotencyUnit {
    Milligrams = "MILLIGRAMS",
    MilligramsPerGram = "MILLIGRAMS_PER_GRAM",
    MilligramsPerMl = "MILLIGRAMS_PER_ML",
    Percentage = "PERCENTAGE"
}
/** Filters to hone results of the `menu` query */
export type MenuFilter = {
    brandId?: Maybe<Scalars['String']>;
    category?: Maybe<Category>;
    effects?: Maybe<Array<Effects>>;
    menuSection?: Maybe<MenuSectionFilter>;
    posMetaData?: Maybe<PosMetaDataFilter>;
    potencyCbd?: Maybe<PotencyRange>;
    potencyThc?: Maybe<PotencyRange>;
    search?: Maybe<Scalars['String']>;
    strainType?: Maybe<StrainType>;
    subcategory?: Maybe<Subcategory>;
    tags?: Maybe<Array<Maybe<Scalars['String']>>>;
    weights?: Maybe<Array<Scalars['String']>>;
};
export type MenuSectionFilter = {
    type: MenuSectionFilterType;
    name?: Maybe<Scalars['String']>;
    specialId?: Maybe<Array<Maybe<Scalars['String']>>>;
};
export type MenuSort = {
    direction: SortDirection;
    key: MenuSortKey;
};
export type PosMetaDataFilter = {
    category?: Maybe<Scalars['String']>;
};
export type PotencyRange = {
    max?: Maybe<Scalars['Float']>;
    min?: Maybe<Scalars['Float']>;
    unit?: Maybe<PotencyUnit>;
};
export declare enum OrdersSortKey {
    CreatedAt = "CREATED_AT"
}
/** Filters to hone results of the `orders` query */
export type OrdersFilter = {
    customerId?: Maybe<Scalars['ID']>;
    orderNumber?: Maybe<Scalars['String']>;
    search?: Maybe<Scalars['String']>;
    createdAt?: Maybe<DateRange>;
};
export type OrdersSort = {
    direction: SortDirection;
    key: OrdersSortKey;
};
export type DateRange = {
    start?: Maybe<Scalars['DateTime']>;
    end?: Maybe<Scalars['DateTime']>;
};
export type OrderItem = {
    __typename?: 'OrderItem';
    option: Scalars['String'];
    price: Scalars['Float'];
    product?: Maybe<Product>;
    productId: Scalars['String'];
    quantity: Scalars['Int'];
    subtotal: Scalars['Float'];
};
export type ReservationDate = {
    __typename?: 'ReservationDate';
    endTime: Scalars['DateTime'];
    startTime: Scalars['DateTime'];
};
export declare enum StrainType {
    HighCbd = "HIGH_CBD",
    Hybrid = "HYBRID",
    Indica = "INDICA",
    NotApplicable = "NOT_APPLICABLE",
    Sativa = "SATIVA"
}
/** List of Effects for Products */
export declare enum Effects {
    Calm = "CALM",
    ClearMind = "CLEAR_MIND",
    Creative = "CREATIVE",
    Energetic = "ENERGETIC",
    Focused = "FOCUSED",
    Happy = "HAPPY",
    Inspired = "INSPIRED",
    Relaxed = "RELAXED",
    Sleepy = "SLEEPY",
    Uplifted = "UPLIFTED"
}
export type Terpene = {
    __typename?: 'Terpene';
    aliasList?: Maybe<Array<Maybe<Scalars['String']>>>;
    aromas?: Maybe<Array<Maybe<Scalars['String']>>>;
    description?: Maybe<Scalars['String']>;
    effects?: Maybe<Array<Maybe<Scalars['String']>>>;
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    potentialHealthBenefits?: Maybe<Array<Maybe<Scalars['String']>>>;
    unitSymbol?: Maybe<Scalars['String']>;
};
export type ActiveCannabinoid = {
    __typename?: 'ActiveCannabinoid';
    cannabinoidId?: Maybe<Scalars['ID']>;
    unit?: Maybe<PotencyUnit>;
    value?: Maybe<Scalars['Float']>;
    cannabinoid?: Maybe<Cannabinoid>;
};
export type Cannabinoid = {
    __typename?: 'Cannabinoid';
    description?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    name: Scalars['String'];
};
export type FlowerEquivalent = {
    __typename?: 'FlowerEquivalent';
    unit?: Maybe<Scalars['String']>;
    value?: Maybe<Scalars['Float']>;
};
/** A particular version of a product, such as a particular weight or size */
export type ProductVariant = {
    __typename?: 'ProductVariant';
    id: Scalars['ID'];
    option: Scalars['String'];
    priceMed?: Maybe<Scalars['Float']>;
    priceRec?: Maybe<Scalars['Float']>;
    specialPriceMed?: Maybe<Scalars['Float']>;
    specialPriceRec?: Maybe<Scalars['Float']>;
    quantity?: Maybe<Scalars['Int']>;
    flowerEquivalent?: Maybe<FlowerEquivalent>;
};
/** Percentage or milligram potency of a particular product */
export type Potency = {
    __typename?: 'Potency';
    /** A formatted string for display, e.g. 'CBD: 100mg' or 'THC: 18.17%' */
    formatted: Scalars['String'];
    range: Array<Scalars['Float']>;
    unit: Scalars['String'];
};
/** Brand information for a product */
export type Brand = {
    __typename?: 'Brand';
    description: Scalars['String'];
    id: Scalars['ID'];
    /** The brand's image source hosted by our CDN */
    imageUrl?: Maybe<Scalars['String']>;
    name: Scalars['String'];
};
/** Retailer docs */
export type Retailer = {
    __typename?: 'Retailer';
    address: Scalars['String'];
    addressObject?: Maybe<AddressObject>;
    banner?: Maybe<Banner>;
    categoryLimits: Array<CategoryLimit>;
    coordinates?: Maybe<Coordinates>;
    deliverySettings: DeliverySettings;
    description: Scalars['String'];
    fulfillmentOptions: FulfillmentOptions;
    hours: HoursSettings;
    id: Scalars['ID'];
    menuTypes: Array<MenuType>;
    name: Scalars['String'];
    paymentMethodsByOrderTypes: Array<PaymentMethodsByOrderType>;
    /** @deprecated Use paymentMethodsByOrderTypes */
    paymentOptions: PaymentOptions;
    phone: Scalars['String'];
    settings: Settings;
};
export declare enum DistanceUnit {
    Mi = "MI",
    Km = "KM"
}
/** Returns a listing of retailers within the current enterprise, sorted by distance to the provided coordinates. */
export type RetailersNearLocationInput = {
    coordinates: CoordinatesInput;
    /** Maximum distance is capped at 250 for miles and 500 for kilometers, larger values will have no effect */
    maxDistance?: Scalars['Float'];
    unit?: DistanceUnit;
};
export type CoordinatesInput = {
    latitude: Scalars['Float'];
    longitude: Scalars['Float'];
};
export type LocationDetail = {
    __typename?: 'LocationDetail';
    distance: Scalars['Float'];
    unit: DistanceUnit;
    /** Effective max distance value, returned after any capping of the input */
    maxDistance: Scalars['Float'];
    validForDelivery: Scalars['Boolean'];
};
export type RetailerNearLocation = {
    __typename?: 'RetailerNearLocation';
    retailer: Retailer;
    locationDetail: LocationDetail;
};
export type AddressObject = {
    __typename?: 'AddressObject';
    line1?: Maybe<Scalars['String']>;
    line2?: Maybe<Scalars['String']>;
    city?: Maybe<Scalars['String']>;
    postalCode?: Maybe<Scalars['String']>;
    state?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
};
export type Banner = {
    __typename?: 'Banner';
    colors: BannerColorConfiguration;
    html: Scalars['String'];
};
export type BannerColorConfiguration = {
    __typename?: 'BannerColorConfiguration';
    /** Hex color code for the background of the banner */
    background: Scalars['String'];
    /** Hex color code for the border of the banner */
    border: Scalars['String'];
    /** Hex color code for the text color of the banner */
    color: Scalars['String'];
    id: Scalars['ID'];
};
export type Coordinates = {
    __typename?: 'Coordinates';
    latitude?: Maybe<Scalars['Float']>;
    longitude?: Maybe<Scalars['Float']>;
};
export type CategoryLimit = {
    __typename?: 'CategoryLimit';
    name?: Maybe<Scalars['String']>;
    value?: Maybe<Scalars['String']>;
};
export type DeliverySettings = {
    __typename?: 'DeliverySettings';
    afterHoursOrderingForDelivery?: Maybe<Scalars['Boolean']>;
    afterHoursOrderingForPickup?: Maybe<Scalars['Boolean']>;
    deliveryArea?: Maybe<Scalars['JSON']>;
    deliveryFee?: Maybe<Scalars['String']>;
    deliveryMinimum?: Maybe<Scalars['String']>;
    disablePurchaseLimits?: Maybe<Scalars['Boolean']>;
    limitPerCustomer?: Maybe<Scalars['Boolean']>;
    pickupMinimum?: Maybe<Scalars['Int']>;
    scheduledOrderingForDelivery?: Maybe<Scalars['Boolean']>;
    scheduledOrderingForPickup?: Maybe<Scalars['Boolean']>;
};
export type FulfillmentOptions = {
    __typename?: 'FulfillmentOptions';
    curbsidePickup?: Maybe<Scalars['Boolean']>;
    delivery?: Maybe<Scalars['Boolean']>;
    driveThruPickup?: Maybe<Scalars['Boolean']>;
    pickup?: Maybe<Scalars['Boolean']>;
};
export type HoursSettings = {
    __typename?: 'HoursSettings';
    curbsidePickup?: Maybe<Hours>;
    delivery?: Maybe<Hours>;
    driveThruPickup?: Maybe<Hours>;
    pickup?: Maybe<Hours>;
    /** @deprecated Use pickup */
    regular?: Maybe<Hours>;
    /** @deprecated Use specialHours */
    special?: Maybe<Array<Maybe<SpecialHours>>>;
    specialHours?: Maybe<Array<Maybe<SpecialHoursV2>>>;
};
export type Hours = {
    __typename?: 'Hours';
    Sunday?: Maybe<HoursDay>;
    Monday?: Maybe<HoursDay>;
    Tuesday?: Maybe<HoursDay>;
    Wednesday?: Maybe<HoursDay>;
    Thursday?: Maybe<HoursDay>;
    Friday?: Maybe<HoursDay>;
    Saturday?: Maybe<HoursDay>;
};
export type HoursDay = {
    __typename?: 'HoursDay';
    active?: Maybe<Scalars['Boolean']>;
    end?: Maybe<Scalars['String']>;
    start?: Maybe<Scalars['String']>;
};
export type SpecialHours = {
    __typename?: 'SpecialHours';
    endDate: Scalars['String'];
    hoursPerDay?: Maybe<Array<Maybe<SpecialHoursDay>>>;
    name: Scalars['String'];
    startDate: Scalars['String'];
};
export type SpecialHoursDay = {
    __typename?: 'SpecialHoursDay';
    date: Scalars['String'];
    deliveryHours: HoursDay;
    pickupHours: HoursDay;
};
export type SpecialHoursV2 = {
    __typename?: 'SpecialHoursV2';
    endDate: Scalars['String'];
    name: Scalars['String'];
    specialOperatingHours?: Maybe<Array<Maybe<SpecialOperatingHoursDay>>>;
    startDate: Scalars['String'];
};
export type SpecialOperatingHoursDay = {
    __typename?: 'SpecialOperatingHoursDay';
    curbsidePickup?: Maybe<HoursDay>;
    date: Scalars['String'];
    delivery?: Maybe<HoursDay>;
    driveThruPickup?: Maybe<HoursDay>;
    pickup?: Maybe<HoursDay>;
};
export type PaymentOptions = {
    __typename?: 'PaymentOptions';
    aeropay?: Maybe<Scalars['Boolean']>;
    alt36?: Maybe<Scalars['Boolean']>;
    canPay?: Maybe<Scalars['Boolean']>;
    cashless?: Maybe<Scalars['Boolean']>;
    cashOnly?: Maybe<Scalars['Boolean']>;
    check?: Maybe<Scalars['Boolean']>;
    creditCard?: Maybe<Scalars['Boolean']>;
    creditCardAtDoor?: Maybe<Scalars['Boolean']>;
    creditCardByPhone?: Maybe<Scalars['Boolean']>;
    debitOnly?: Maybe<Scalars['Boolean']>;
    hypur?: Maybe<Scalars['Boolean']>;
    linx?: Maybe<Scalars['Boolean']>;
    merrco?: Maybe<Scalars['Boolean']>;
    payInStore?: Maybe<Scalars['Boolean']>;
    paytender?: Maybe<Scalars['Boolean']>;
};
export declare enum PaymentMethod {
    Aeropay = "AEROPAY",
    Alt_36 = "ALT_36",
    CanPay = "CAN_PAY",
    Cash = "CASH",
    Chase = "CHASE",
    Check = "CHECK",
    Credit = "CREDIT",
    CreditCard = "CREDIT_CARD",
    CreditCardAtDoor = "CREDIT_CARD_AT_DOOR",
    CreditCardByPhone = "CREDIT_CARD_BY_PHONE",
    Debit = "DEBIT",
    DebitCard = "DEBIT_CARD",
    DebitOnly = "DEBIT_ONLY",
    DutchiePay = "DUTCHIE_PAY",
    Hypur = "HYPUR",
    InStoreCreditCard = "IN_STORE_CREDIT_CARD",
    Linx = "LINX",
    Merrco = "MERRCO",
    Moneris = "MONERIS",
    Paytender = "PAYTENDER"
}
export type PaymentMethodsByOrderType = {
    __typename?: 'PaymentMethodsByOrderType';
    orderType: OrderType;
    paymentMethods: Array<PaymentMethod>;
};
export type Settings = {
    __typename?: 'Settings';
    menuWeights?: Maybe<Scalars['String']>;
};
/** Specials returns all active specials */
export type Special = {
    __typename?: 'Special';
    id: Scalars['ID'];
    name: Scalars['String'];
    type: SpecialType;
    redemptionLimit?: Maybe<Scalars['Int']>;
    menuType?: Maybe<SpecialMenuType>;
    emailConfiguration?: Maybe<SpecialEmail>;
    scheduleConfiguration?: Maybe<SpecialSchedule>;
    menuDisplayConfiguration?: Maybe<SpecialMenuDisplay>;
};
export declare enum SpecialType {
    Sale = "SALE",
    Offer = "OFFER"
}
export declare enum SpecialMenuType {
    Both = "BOTH",
    Medical = "MEDICAL",
    Recreational = "RECREATIONAL"
}
export type SpecialEmail = {
    __typename?: 'SpecialEmail';
    description?: Maybe<Scalars['String']>;
    descriptionHtml?: Maybe<Scalars['String']>;
    subject?: Maybe<Scalars['String']>;
    heading?: Maybe<Scalars['String']>;
    enabled?: Maybe<Scalars['Boolean']>;
};
export type SpecialSchedule = {
    __typename?: 'SpecialSchedule';
    /** Start date for one time and recurring specials */
    startStamp?: Maybe<Scalars['DateTime']>;
    /** End date for one time specials */
    endStamp?: Maybe<Scalars['DateTime']>;
    /** Days of the week recurring special runs. 0 = Sunday, 6 = Saturday */
    days?: Maybe<Array<Maybe<Scalars['Int']>>>;
    /** @deprecated Use recurringStartTime */
    startTime?: Maybe<Scalars['DateTime']>;
    /** @deprecated Use recurringEndTime */
    endTime?: Maybe<Scalars['DateTime']>;
    /** Is there an end date for recurring special */
    setEndDate?: Maybe<Scalars['Boolean']>;
    /** End date for recurring special */
    endDate?: Maybe<Scalars['DateTime']>;
    /** Human readable time that a recurring special starts, e.g. 10:00 AM */
    recurringStartTime?: Maybe<Scalars['String']>;
    /** Human readable time that a recurring special ends, e.g. 10:00 AM */
    recurringEndTime?: Maybe<Scalars['String']>;
};
export type SpecialMenuDisplay = {
    __typename?: 'SpecialMenuDisplay';
    name?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    image?: Maybe<Scalars['String']>;
};
/** Customer information */
export type Customer = {
    __typename?: 'Customer';
    birthdate?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    guest: Scalars['Boolean'];
    id: Scalars['ID'];
    medicalCard?: Maybe<MedicalCard>;
    name?: Maybe<Scalars['String']>;
    optIns: OptIns;
    orders?: Maybe<Array<Order>>;
    phone: Scalars['String'];
};
export type CustomersFilter = {
    email?: Maybe<Scalars['String']>;
};
/** Order information */
export type Order = {
    __typename?: 'Order';
    createdAt: Scalars['DateTime'];
    customer?: Maybe<Customer>;
    customerId?: Maybe<Scalars['ID']>;
    delivery: Scalars['Boolean'];
    discounts?: Maybe<Discounts>;
    dispensaryName: Scalars['String'];
    fees?: Maybe<Fees>;
    foreignId: Scalars['String'];
    id: Scalars['ID'];
    items: Array<OrderItem>;
    medical: Scalars['Boolean'];
    metadata?: Maybe<Scalars['JSON']>;
    orderNumber: Scalars['String'];
    paymentMethod: PaymentMethod;
    pickup: Scalars['Boolean'];
    recreational: Scalars['Boolean'];
    reservationDate?: Maybe<ReservationDate>;
    status: Scalars['String'];
    subtotal: Scalars['Float'];
    tax: Scalars['Float'];
    taxes?: Maybe<Taxes>;
    total: Scalars['Float'];
};
export type Discounts = {
    __typename?: 'Discounts';
    total?: Maybe<Scalars['Float']>;
};
export type Taxes = {
    __typename?: 'Taxes';
    cannabis?: Maybe<Scalars['Float']>;
    sales?: Maybe<Scalars['Float']>;
    total?: Maybe<Scalars['Float']>;
};
export type Fees = {
    __typename?: 'Fees';
    delivery?: Maybe<Scalars['Float']>;
    payment?: Maybe<Scalars['Float']>;
    tip?: Maybe<Scalars['Float']>;
    total?: Maybe<Scalars['Float']>;
};
/** Product information such as name, image, etc. */
export type Product = {
    __typename?: 'Product';
    brand?: Maybe<Brand>;
    category: Category;
    /** Product description in plaintext */
    description: Scalars['String'];
    /** Product description in pre-rendered HTML */
    descriptionHtml: Scalars['String'];
    /** List of product effects */
    effects: Array<Effects>;
    enterpriseProductId?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    /** ID of active product batch to identify terpene and cannabinoid concentrations */
    productBatchId?: Maybe<Scalars['ID']>;
    productAvailabilityByRetailer?: Maybe<Array<Maybe<ProductAvailabilityByRetailer>>>;
    /**
     * The product's image source hosted by our CDN
     * @deprecated Use images
     */
    image: Scalars['String'];
    images: Array<ProductImage>;
    menuTypes: Array<MenuType>;
    name: Scalars['String'];
    /** a human-readable unique identifier */
    slug?: Maybe<Scalars['String']>;
    /** The product's point-of-sale id if it was imported from a 3rd-party integration */
    posId?: Maybe<Scalars['String']>;
    potencyCbd?: Maybe<Potency>;
    potencyThc?: Maybe<Potency>;
    /** Metadata object that contains data from POS systems */
    posMetaData?: Maybe<PosMetaData>;
    /** A flag indicating this product is one of your staff's top choices */
    staffPick: Scalars['Boolean'];
    strainType?: Maybe<StrainType>;
    subcategory?: Maybe<Subcategory>;
    tags: Array<Scalars['String']>;
    /** A list of versions of this product available for sale */
    variants: Array<ProductVariant>;
    terpenes?: Maybe<Array<Maybe<ActiveTerpene>>>;
    cannabinoids?: Maybe<Array<Maybe<ActiveCannabinoid>>>;
};
export type ActiveTerpene = {
    __typename?: 'ActiveTerpene';
    id?: Maybe<Scalars['ID']>;
    terpene?: Maybe<Terpene>;
    name?: Maybe<Scalars['String']>;
    terpeneId?: Maybe<Scalars['ID']>;
    unit?: Maybe<PotencyUnit>;
    unitSymbol?: Maybe<Scalars['String']>;
    value?: Maybe<Scalars['Float']>;
};
export type ProductImage = {
    __typename?: 'ProductImage';
    id?: Maybe<Scalars['ID']>;
    url: Scalars['String'];
    label?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
};
/** The product's point-of-sale data if it was imported from a 3rd-party integration */
export type PosMetaData = {
    __typename?: 'PosMetaData';
    id?: Maybe<Scalars['String']>;
    category?: Maybe<Scalars['String']>;
    sku?: Maybe<Scalars['String']>;
};
export type ProductAvailabilityByRetailer = {
    __typename?: 'ProductAvailabilityByRetailer';
    isAvailable: Scalars['Boolean'];
    retailer: Retailer;
    productId: Scalars['String'];
};
export type UpdateCheckoutMutationVariables = Exact<{
    checkoutId: Scalars['ID'];
    orderType: OrderType;
    pricingType: PricingType;
    retailerId: Scalars['ID'];
}>;
export type UpdateCheckoutMutation = ({
    __typename?: 'Mutation';
} & {
    updateCheckout?: Maybe<({
        __typename?: 'Checkout';
    } & CheckoutFragment)>;
});
export type CheckoutFragment = ({
    __typename?: 'Checkout';
} & Pick<Checkout, 'id' | 'orderType' | 'pricingType' | 'redirectUrl'> & {
    items: Array<({
        __typename?: 'Item';
    } & CheckoutItemFragment)>;
});
export type CheckoutItemFragment = ({
    __typename?: 'Item';
} & Pick<Item, 'id' | 'option' | 'quantity'> & {
    product: ({
        __typename?: 'Product';
    } & Pick<Product, 'image' | 'name'> & {
        brand?: Maybe<({
            __typename?: 'Brand';
        } & Pick<Brand, 'name'>)>;
        variants: Array<({
            __typename?: 'ProductVariant';
        } & Pick<ProductVariant, 'option' | 'priceRec'>)>;
    });
});
export declare const CheckoutItemFragmentDoc: Apollo.DocumentNode;
export declare const CheckoutFragmentDoc: Apollo.DocumentNode;
export declare const UpdateCheckoutDocument: Apollo.DocumentNode;
export type UpdateCheckoutMutationFn = Apollo.MutationFunction<UpdateCheckoutMutation, UpdateCheckoutMutationVariables>;
/**
 * __useUpdateCheckoutMutation__
 *
 * To run a mutation, you first call `useUpdateCheckoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCheckoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCheckoutMutation, { data, loading, error }] = useUpdateCheckoutMutation({
 *   variables: {
 *      checkoutId: // value for 'checkoutId'
 *      orderType: // value for 'orderType'
 *      pricingType: // value for 'pricingType'
 *      retailerId: // value for 'retailerId'
 *   },
 * });
 */
export declare function useUpdateCheckoutMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCheckoutMutation, UpdateCheckoutMutationVariables>): Apollo.MutationTuple<UpdateCheckoutMutation, Exact<{
    checkoutId: string;
    orderType: OrderType;
    pricingType: PricingType;
    retailerId: string;
}>>;
export type UpdateCheckoutMutationHookResult = ReturnType<typeof useUpdateCheckoutMutation>;
export type UpdateCheckoutMutationResult = Apollo.MutationResult<UpdateCheckoutMutation>;
export type UpdateCheckoutMutationOptions = Apollo.BaseMutationOptions<UpdateCheckoutMutation, UpdateCheckoutMutationVariables>;
