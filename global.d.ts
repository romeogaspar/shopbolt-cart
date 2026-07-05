/**
 * Minimal type surface for the Snipcart v3 global.
 * Only what ShopBolt actually calls — extend as needed.
 */
export {}

declare global {
  interface Window {
    Snipcart?: {
      api?: {
        theme?: {
          cart?: {
            close: () => void
            open: () => void
          }
        }
      }
      events?: {
        on: (
          event: string,
          callback: (payload: unknown) => void
        ) => () => void
      }
    }
    SnipcartSettings?: {
      publicApiKey: string
      version?: string
      addProductBehavior?: 'none'
      modalStyle?: 'side'
      [key: string]: unknown
    }
  }
}