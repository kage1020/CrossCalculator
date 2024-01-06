import { IconBaseProps } from 'react-icons';

// Devicon Plain
export function QwikIcon({ size = '24', color = 'currentColor', ...props }: IconBaseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 128 128'
      style={{ color: color }}
      {...props}
      data-testid='qwik-icon'
    >
      <path
        fill='currentColor'
        d='m77.734 15.32l-8.406.239l-25.094.066a13.46 13.46 0 0 0-11.511 6.633L17.477 52.539l.134-.168c-2.853 4.342-3.093 10.235-.404 14.734l15.918 26.422c2.434 4.051 6.258 6.657 11.598 6.465c11.304-.402 16.273-.402 16.273-.402l34.668 12.957l-.898-.893l.703.686c.605.586 1.59-.117 1.187-.84L87.73 93.938l16.555-29.977c2.508-5.176 3.406-9.703.93-14.254l-3.524-6.484l-1.828-3.328l-.71-1.297l-.067.074L89.5 22.043a13.397 13.397 0 0 0-11.766-6.723m17.93 97.227l.008.012v-.004zM44.762 18.594l35.793 39.36l-6.407 6.491l3.797 30.58L40.93 58.418l9.152-8.82l-5.383-30.84L19.686 49.79zm33.265 76.574v.084l-.03.006v-.049z'
      />
    </svg>
  );
}

type LoadingIconProps = IconBaseProps & { duration?: string };

// Material Line Icons
export function LoadingIcon({
  size = '24',
  duration = '1.5s',
  color = 'currentColor',
  ...props
}: LoadingIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      style={{ color: color }}
      {...props}
      data-testid='loading-icon'
    >
      <g fill='none' stroke='currentColor' strokeLinecap='round' strokeWidth='2'>
        <path
          strokeDasharray='60'
          strokeDashoffset='60'
          strokeOpacity='.3'
          d='M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z'
        >
          <animate fill='freeze' attributeName='stroke-dashoffset' dur='1.3s' values='60;0' />
        </path>
        <path strokeDasharray='15' strokeDashoffset='15' d='M12 3C16.9706 3 21 7.02944 21 12'>
          <animate fill='freeze' attributeName='stroke-dashoffset' dur='0.3s' values='15;0' />
          <animateTransform
            attributeName='transform'
            dur={duration}
            repeatCount='indefinite'
            type='rotate'
            values='0 12 12;360 12 12'
          />
        </path>
      </g>
    </svg>
  );
}
