import { Purchases, LogLevel } from '@revenuecat/purchases-js';

// RevenueCat API keys
const REVENUECAT_PUBLIC_SDK_KEY = 'rcb_GHoOlGpwyoIPAGoFRWeFttlnqNXn'; // Production key

// For debugging - set to true to use hardcoded offerings for testing
// Removing the unused variable warning
// const USE_HARDCODED_OFFERINGS = true;

// Product IDs
export const PRODUCT_IDS = {
  BASIC_SUBSCRIPTION: 'vibecheck_basic_monthly',
  PRO_SUBSCRIPTION: 'vibecheck_pro_monthly',
  BASIC_PRODUCT_ID: 'prodb24663453e', // RevenueCat Basic product ID
  PRO_PRODUCT_ID: 'prod4394b89fd3', // RevenueCat Pro product ID
};

// Track if RevenueCat has been initialized
let isInitialized = false;

// Initialize RevenueCat
export const initializeRevenueCat = () => {
  if (typeof window === 'undefined') {
    console.warn('RevenueCat cannot be initialized in a server environment');
    return false;
  }

  // If already initialized, don't initialize again
  if (isInitialized) {
    return true;
  }

  try {
    // Enable verbose logging in development
    if (process.env.NODE_ENV !== 'production') {
      Purchases.setLogLevel(LogLevel.Verbose);
    }

    // Generate a unique anonymous ID for the user
    const anonymousId = 'anonymous-' + Date.now();

    // Configure RevenueCat with the API key and anonymous user ID
    Purchases.configure(
      REVENUECAT_PUBLIC_SDK_KEY,
      anonymousId,
      {
        // Add any additional HTTP configuration options here
      },
      {
        // Add any additional flags here
        collectAnalyticsEvents: true,
        autoCollectUTMAsMetadata: true
      }
    );

    isInitialized = true;
    console.log('RevenueCat SDK initialized successfully with ID:', anonymousId);
    return true;
  } catch (error) {
    console.error('Error initializing RevenueCat:', error);
    return false;
  }
};

// Get current offerings
export const getOfferings = async () => {
  try {
    // Make sure RevenueCat is initialized
    const initialized = initializeRevenueCat();
    if (!initialized) {
      throw new Error('Failed to initialize RevenueCat');
    }

    console.log('Fetching offerings from RevenueCat...');

    // Add a timeout to the offerings request
    const offeringsPromise = Purchases.getSharedInstance().getOfferings();

    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Offerings request timed out after 10 seconds')), 10000);
    });

    // Define a type for the offerings response
    interface OfferingsResponse {
      current?: {
        identifier: string;
        availablePackages: Array<{
          identifier: string;
          packageType: string;
          webBillingProduct?: {
            title?: string;
            description?: string;
            priceString?: string;
            price?: string;
          };
        }>;
      };
      all: Record<string, any>;
    }

    // Race the offerings request against the timeout
    const offerings = await Promise.race([offeringsPromise, timeoutPromise]) as OfferingsResponse;

    console.log('Offerings received:', offerings);

    // Validate offerings
    if (!offerings) {
      throw new Error('No offerings returned from RevenueCat');
    }

    // Check if there's a current offering
    if (!offerings.current) {
      console.warn('No current offering found in RevenueCat response');

      // Check if there are any offerings at all
      const offeringIds = Object.keys(offerings.all);
      console.log('Available offerings:', offeringIds);

      if (offeringIds.length > 0) {
        // Use the first available offering as a fallback
        const firstOfferingId = offeringIds[0];
        console.log(`Using "${firstOfferingId}" as fallback offering`);

        // Create a modified offerings object with the first offering as current
        const modifiedOfferings = {
          ...offerings,
          current: offerings.all[firstOfferingId]
        };

        if (modifiedOfferings.current) {
          console.log('Fallback offering packages:', modifiedOfferings.current.availablePackages.length);
          return modifiedOfferings;
        }
      }
    } else {
      console.log('Current offering:', offerings.current.identifier);
      console.log('Available packages:', offerings.current.availablePackages.length);
    }

    return offerings;
  } catch (error) {
    console.error('Error fetching offerings:', error);
    // Add more detailed error information
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      if ('stack' in error) {
        console.error('Stack trace:', error.stack);
      }
    }
    throw error;
  }
};

// Define the package type to match RevenueCat's requirements
interface Package {
  identifier: string;
  packageType: string;
  webBillingProduct?: {
    title?: string;
    description?: string;
    priceString?: string;
    price?: string;
  };
  // Add any other required properties from RevenueCat's Package type
  [key: string]: any; // This allows for any additional properties required by RevenueCat
}

// Purchase a package
export const purchasePackage = async (packageToPurchase: Package) => {
  try {
    // Make sure RevenueCat is initialized
    const initialized = initializeRevenueCat();
    if (!initialized) {
      throw new Error('Failed to initialize RevenueCat');
    }

    console.log('Starting purchase process for package:', packageToPurchase.identifier);

    // Validate the package
    if (!packageToPurchase || !packageToPurchase.identifier) {
      throw new Error('Invalid package provided for purchase');
    }

    // This will open the RevenueCat checkout
    // Use type assertion to avoid TypeScript errors with the RevenueCat SDK
    const result = await Purchases.getSharedInstance().purchase({
      rcPackage: packageToPurchase as any,
      // Add any additional purchase parameters here if needed
    });

    if (!result) {
      throw new Error('Purchase failed: No result returned');
    }

    if (!result.customerInfo) {
      throw new Error('Purchase failed: No customer info returned');
    }

    // Log the purchase result for debugging
    console.log('RevenueCat purchase successful:', {
      operationSessionId: result.operationSessionId,
      entitlements: result.customerInfo.entitlements
    });

    // Return the customer info
    return result.customerInfo;
  } catch (error) {
    console.error('Error purchasing package:', error);

    // Add more detailed error information
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      if ('stack' in error) {
        console.error('Stack trace:', error.stack);
      }

      // Check for user cancellation
      if (error.message.includes('cancel') || error.message.includes('cancelled')) {
        throw new Error('Purchase was cancelled by the user');
      }
    }

    throw error;
  }
};

// Check if user has active subscription
export const checkSubscriptionStatus = async () => {
  try {
    // Make sure RevenueCat is initialized
    const initialized = initializeRevenueCat();
    if (!initialized) {
      console.warn('Failed to initialize RevenueCat during subscription check');
      return {
        hasActiveSubscription: false,
        activeSubscription: null,
        customerInfo: null,
      };
    }

    console.log('Checking subscription status...');

    const customerInfo = await Purchases.getSharedInstance().getCustomerInfo();

    console.log('Customer info received:', {
      originalAppUserId: customerInfo.originalAppUserId,
      entitlements: customerInfo.entitlements
    });

    // Check if user has active subscription
    const hasActiveSubscription =
      customerInfo.entitlements?.active?.basic ||
      customerInfo.entitlements?.active?.pro;

    // Determine which subscription is active
    const activeSubscription =
      customerInfo.entitlements?.active?.pro ? 'pro' :
      customerInfo.entitlements?.active?.basic ? 'basic' : null;

    console.log('Subscription status:', {
      hasActiveSubscription: !!hasActiveSubscription,
      activeSubscription
    });

    return {
      hasActiveSubscription: !!hasActiveSubscription,
      activeSubscription,
      customerInfo,
    };
  } catch (error) {
    console.error('Error checking subscription status:', error);

    // Add more detailed error information
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      if ('stack' in error) {
        console.error('Stack trace:', error.stack);
      }
    }

    return {
      hasActiveSubscription: false,
      activeSubscription: null,
      customerInfo: null,
    };
  }
};

// Login user to RevenueCat
export const loginUser = async (userId: string) => {
  try {
    if (typeof window === 'undefined') {
      console.warn('RevenueCat login cannot be performed in a server environment');
      return false;
    }

    if (!userId) {
      console.error('Cannot login with empty user ID');
      return false;
    }

    console.log('Logging in user to RevenueCat with ID:', userId);

    // Note: The Web SDK doesn't have a direct login method like the mobile SDKs
    // Instead, we need to reconfigure the SDK with the new user ID
    Purchases.configure(
      REVENUECAT_PUBLIC_SDK_KEY,
      userId,
      {
        // Add any additional HTTP configuration options here
      },
      {
        // Add any additional flags here
        collectAnalyticsEvents: true,
        autoCollectUTMAsMetadata: true
      }
    );

    isInitialized = true;

    // Get customer info to verify the login worked
    const customerInfo = await Purchases.getSharedInstance().getCustomerInfo();
    console.log('Login successful, customer info:', {
      originalAppUserId: customerInfo.originalAppUserId,
      entitlements: customerInfo.entitlements
    });

    return true;
  } catch (error) {
    console.error('Error logging in user to RevenueCat:', error);

    // Add more detailed error information
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      if ('stack' in error) {
        console.error('Stack trace:', error.stack);
      }
    }

    return false;
  }
};

// Logout user from RevenueCat
export const logoutUser = async () => {
  try {
    if (typeof window === 'undefined') {
      console.warn('RevenueCat logout cannot be performed in a server environment');
      return false;
    }

    console.log('Logging out user from RevenueCat');

    // Note: The Web SDK doesn't have a direct logout method like the mobile SDKs
    // Instead, we need to reconfigure the SDK with an anonymous user ID
    const anonymousId = 'anonymous-' + Date.now();

    Purchases.configure(
      REVENUECAT_PUBLIC_SDK_KEY,
      anonymousId,
      {
        // Add any additional HTTP configuration options here
      },
      {
        // Add any additional flags here
        collectAnalyticsEvents: true,
        autoCollectUTMAsMetadata: true
      }
    );

    isInitialized = true;
    console.log('Logout successful, new anonymous ID:', anonymousId);

    return true;
  } catch (error) {
    console.error('Error logging out user from RevenueCat:', error);

    // Add more detailed error information
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      if ('stack' in error) {
        console.error('Stack trace:', error.stack);
      }
    }

    return false;
  }
};
