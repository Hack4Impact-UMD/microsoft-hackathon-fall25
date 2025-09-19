import { twMerge } from 'tailwind-merge'
import { Recipe } from '../shared/types'
import AddIcon from '@mui/icons-material/Add';

// Union alias derived from Recipe type for meal categories
export type MealType = Recipe['meal'][number]

// The recipe prop now includes an optional image field to match the design.
export interface MealPlanCellProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mealType: MealType
  dateLabel?: string
  recipe?: Pick<Recipe, 'id' | 'title'> & { image?: string } | null
  onAdd?: (mealType: MealType) => void
  onOpen?: (recipe: Pick<Recipe, 'id' | 'title'> & { image?: string }, mealType: MealType) => void
  isToday?: boolean
}

export default function MealPlanCell({
  mealType,
  dateLabel,
  recipe = null,
  onAdd,
  onOpen,
  isToday = false,
  className = '',
  disabled,
  ...rest
}: MealPlanCellProps) {
  const isEmpty = !recipe

  // Applying fixed dimensions and styling from the design spec.
  const baseClasses =
    'relative inline-flex flex-col items-center justify-center rounded-[20px] bg-white shadow-sm transition-colors focus:outline-none focus-visible:ring-2 ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-[77.5px] h-[112.83px] p-[7px]'

  // Border is now transparent on empty, and visible on assigned.
  const stateClasses = isEmpty
    ? 'border-transparent text-gray-400 hover:bg-gray-50 focus-visible:ring-sky-500'
    : 'border border-gray-200 hover:bg-gray-50 focus-visible:ring-sky-500 justify-between'

  const ariaLabel = isEmpty
    ? `Add ${mealType}${dateLabel ? ` for ${dateLabel}` : ''}`
    : `Open ${recipe.title} (${mealType}${dateLabel ? `, ${dateLabel}` : ''})`

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (disabled) return
    if (isEmpty) onAdd?.(mealType)
    else if (recipe) onOpen?.(recipe, mealType)
    rest.onClick?.(e)
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      title={ariaLabel}
      disabled={disabled}
      onClick={handleClick}
      className={twMerge(
        baseClasses,
        stateClasses,
        isToday ? 'ring-2 ring-sky-500 ring-offset-1' : '',
        !disabled && isEmpty ? 'cursor-pointer' : '',
        className
      )}
      {...rest}
    >
      {isEmpty ? (
        <AddIcon sx={{ fontSize: 40 }} />
      ) : (
        <>
          {recipe.image && (
            <img src={recipe.image} alt={recipe.title} className="w-full h-auto object-cover rounded-md" />
          )}
          <span className="text-xs font-medium text-gray-700 text-center truncate w-full">
            {recipe.title}
          </span>
        </>
      )}
    </button>
  )
}