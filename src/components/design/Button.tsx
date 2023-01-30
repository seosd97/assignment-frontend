import { cx } from '@/shared/utils/cx'

interface IButtonProps {
  text?: string
  size?: 'xs' | 'sm' | 'base' | 'lg'
  theme?: 'Filled' | 'Outlined' | 'Accent'
  color?: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: () => void
  disable?: boolean
}

const buttonHeight = (size: string) => {
  if (size === 'xs') return ` h-[35px] text-${size} `
  else if (size === 'sm') return ` h-[41px] text-${size} `
  else if (size === 'base') return ` h-[44px] text-${size} `
  else if (size === 'lg') return ' h-[52px] text-base '
}

const buttonThemeCSS = (theme: string) => {
  if (theme === 'Filled') return ' bg-bgQuarternary hover:bg-bgButtonHover '
  else if (theme === 'Outlined') return ' border border-twPaletteGray400 hover:bg-bgOutlineHover '
  else if (theme === 'Accent') return ' bg-bgAccent '
}

const buttonDisable = (disable: boolean) => {
  if (disable) return ' bg-bgQuarternary opacity-30 '
}

const buttonTextColor = (theme: string, color?: string) => {
  if (color !== undefined) {
    return color
  }

  if (theme === 'Accent') {
    return 'text-black'
  }

  return 'text-textPrimary'
}

const Button = ({
  onClick,
  text = '',
  size = 'base',
  theme = 'Filled',
  className = '',
  color,
  disable = false,
  type = 'button',
}: IButtonProps) => {
  const defaultButtonClass = 'w-full rounded font-medium cursor-pointer leading-normal shadow-sm '

  return (
    <button
      className={cx(
        className,
        buttonTextColor(theme, color),
        buttonHeight(size),
        defaultButtonClass,
        buttonThemeCSS(theme),
        buttonDisable(disable),
      )}
      type={type}
      disabled={disable}
      onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
