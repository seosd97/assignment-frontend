/// <reference types="react-scripts" />

// eslint-disable-next-line @typescript-eslint/naming-convention
interface Window {
  ethereum?: import('ethers').providers.ExternalProvider
}
