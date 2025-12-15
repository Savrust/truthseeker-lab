import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";

type SubscriptionPlan = "vantage" | "premium" | "pro" | null;

interface SubscriptionContextType {
  subscriptionPlan: SubscriptionPlan;
  isSubscribed: boolean;
  subscribe: (plan: "vantage" | "premium" | "pro") => void;
  cancelSubscription: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const SUBSCRIPTION_START_TIME_KEY = "subscriptionStartTime";
const SUBSCRIPTION_DURATION_MS = 10 * 60 * 1000; // 10 minutes in milliseconds

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem("subscriptionPlan");
    return (saved as SubscriptionPlan) || null;
  });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Check if subscription should be auto-cancelled on mount or when subscriptionPlan changes
  useEffect(() => {
    if (subscriptionPlan) {
      const startTime = localStorage.getItem(SUBSCRIPTION_START_TIME_KEY);
      if (startTime) {
        const elapsed = Date.now() - parseInt(startTime, 10);
        if (elapsed >= SUBSCRIPTION_DURATION_MS) {
          // Already past 10 minutes, cancel immediately
          setSubscriptionPlan(null);
          localStorage.removeItem(SUBSCRIPTION_START_TIME_KEY);
          localStorage.removeItem("subscriptionPlan");
        } else {
          // Clear any existing timer
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          // Set timer for remaining time
          const remaining = SUBSCRIPTION_DURATION_MS - elapsed;
          timerRef.current = setTimeout(() => {
            setSubscriptionPlan(null);
            localStorage.removeItem(SUBSCRIPTION_START_TIME_KEY);
            localStorage.removeItem("subscriptionPlan");
          }, remaining);
        }
      } else {
        // No start time found, but subscription exists - this shouldn't happen
        // but if it does, cancel the subscription to be safe
        setSubscriptionPlan(null);
        localStorage.removeItem(SUBSCRIPTION_START_TIME_KEY);
        localStorage.removeItem("subscriptionPlan");
      }
    }
  }, [subscriptionPlan]);

  useEffect(() => {
    // Save to localStorage whenever subscription changes
    if (subscriptionPlan) {
      localStorage.setItem("subscriptionPlan", subscriptionPlan);
    } else {
      localStorage.removeItem("subscriptionPlan");
      localStorage.removeItem(SUBSCRIPTION_START_TIME_KEY);
      // Clear timer if subscription is cancelled
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [subscriptionPlan]);

  const subscribe = (plan: "vantage" | "premium" | "pro") => {
    // Store the start time
    const startTime = Date.now().toString();
    localStorage.setItem(SUBSCRIPTION_START_TIME_KEY, startTime);
    
    // Set subscription plan (this will trigger the useEffect to set up the timer)
    setSubscriptionPlan(plan);
  };

  const cancelSubscription = () => {
    setSubscriptionPlan(null);
    localStorage.removeItem(SUBSCRIPTION_START_TIME_KEY);
    // Clear timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptionPlan,
        isSubscribed: subscriptionPlan !== null,
        subscribe,
        cancelSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
};

