import React from 'react';

export interface LogoProps {
  className?: string;
  variant?: 'default' | 'white' | 'dark';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  height?: number; // Optional explicit height in px (e.g. 48-56px for header)
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'default',
  showTagline = true,
  size = 'md',
  height,
}) => {
  const isWhite = variant === 'white';
  const isDark = variant === 'dark';

  // Primary brand colors from the prompt:
  // Chữ viết tay màu xanh baby đậm #7BA7DE
  const blueColor = isWhite ? '#FFFFFF' : isDark ? '#222222' : '#7BA7DE';
  // Nền hồng nhạt #F8C3D3
  const pinkBase = isWhite ? '#FFFFFF' : isDark ? '#444444' : '#F8C3D3';
  // Mảng sáng hơn #FBD9E4
  const pinkHighlight = isWhite ? '#FFFFFF' : isDark ? '#555555' : '#FBD9E4';
  // Viền ngoài và nếp gấp màu hồng đậm #E58BA6
  const pinkStroke = isWhite ? '#FFFFFF' : isDark ? '#222222' : '#E58BA6';
  // Lỗ tròn giữa scrunchie lộ nền kem #FBF8F2
  const centerHoleColor = isWhite ? '#1E293B' : isDark ? '#FFFFFF' : '#FBF8F2';

  const defaultDimensions = {
    sm: { height: 44, width: showTagline ? 180 : 160 },
    md: { height: 52, width: showTagline ? 215 : 190 }, // 48-56px header sweet spot
    lg: { height: 68, width: showTagline ? 275 : 240 },
    xl: { height: 88, width: showTagline ? 350 : 310 },
  };

  const chosenHeight = height || defaultDimensions[size].height;
  const viewBoxHeight = showTagline ? 102 : 78;
  const aspectRatio = 310 / viewBoxHeight;
  const computedWidth = Math.round(chosenHeight * aspectRatio);

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      style={{
        height: `${chosenHeight}px`,
        width: `${computedWidth}px`,
      }}
    >
      <svg
        viewBox={`0 0 310 ${viewBoxHeight}`}
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        aria-label="Blonéa - Scrunchies for your everyday vibe"
      >
        {/* --- 1. Left Ray Accents (3 tia bên trái chữ B) --- */}
        <g stroke={blueColor} strokeWidth="3.2" strokeLinecap="round">
          <path d="M12 28L4 25" />
          <path d="M14 36L5 37" />
          <path d="M16 44L9 47" />
        </g>

        {/* --- 2. Wordmark: "Bl" Brush Script --- */}
        <text
          x="19"
          y="58"
          fontFamily="'Pacifico', 'Nunito', cursive, sans-serif"
          fontWeight="900"
          fontSize="54"
          fill={blueColor}
          style={{ letterSpacing: '-0.5px' }}
        >
          Bl
        </text>

        {/* --- 3. Scrunchie replacing the letter 'o' (KHÔNG CÓ CHỮ O NÀO KHÁC) --- */}
        {/* Nằm giữa "l" và "n", đường kính khoảng 1.3-1.4 lần chiều cao chữ thường (~48-50px) */}
        <g transform="translate(86, 12)">
          {/* 9 rounded puffy lobes around center circle (viền ngoài lượn sóng 9 múi tròn) */}
          {/* Lobe 1: Top */}
          <circle cx="25" cy="11" r="9.5" fill={pinkHighlight} stroke={pinkStroke} strokeWidth="1.6" />
          {/* Lobe 2: Top-right */}
          <circle cx="36" cy="16" r="9" fill={pinkBase} stroke={pinkStroke} strokeWidth="1.6" />
          {/* Lobe 3: Right-top */}
          <circle cx="43" cy="26" r="9" fill={pinkHighlight} stroke={pinkStroke} strokeWidth="1.6" />
          {/* Lobe 4: Right-bottom */}
          <circle cx="39" cy="37" r="9" fill={pinkBase} stroke={pinkStroke} strokeWidth="1.6" />
          {/* Lobe 5: Bottom-right */}
          <circle cx="30" cy="45" r="9" fill={pinkHighlight} stroke={pinkStroke} strokeWidth="1.6" />
          {/* Lobe 6: Bottom-left */}
          <circle cx="19" cy="45" r="9" fill={pinkBase} stroke={pinkStroke} strokeWidth="1.6" />
          {/* Lobe 7: Left-bottom */}
          <circle cx="10" cy="37" r="9" fill={pinkHighlight} stroke={pinkStroke} strokeWidth="1.6" />
          {/* Lobe 8: Left-top */}
          <circle cx="7" cy="26" r="9" fill={pinkBase} stroke={pinkStroke} strokeWidth="1.6" />
          {/* Lobe 9: Top-left */}
          <circle cx="14" cy="15" r="9" fill={pinkHighlight} stroke={pinkStroke} strokeWidth="1.6" />

          {/* Central main puffy body blending lobes */}
          <circle cx="25" cy="28" r="19" fill={pinkBase} />

          {/* Center Hole revealing cream background #FBF8F2 (đường kính ~ 1/4 vòng) */}
          <circle
            cx="25"
            cy="28"
            r="7"
            fill={centerHoleColor}
            stroke={pinkStroke}
            strokeWidth="1.8"
          />

          {/* S-curve soft fabric folds radiating from hole to lobes */}
          <path d="M19 23C21 21 23 17 24 13" stroke={pinkStroke} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M29 22C31 20 34 18 36 17" stroke={pinkStroke} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M31 26C34 26 38 27 41 27" stroke={pinkStroke} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M30 32C33 34 36 36 37 39" stroke={pinkStroke} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M26 34C26 38 27 41 28 44" stroke={pinkStroke} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M21 34C20 37 19 40 18 43" stroke={pinkStroke} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M18 30C15 32 13 34 11 36" stroke={pinkStroke} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M18 26C15 25 13 25 9 26" stroke={pinkStroke} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M20 22C18 19 16 17 14 16" stroke={pinkStroke} strokeWidth="1.4" strokeLinecap="round" />

          {/* Nút thắt nơ nhỏ ở góc dưới bên phải vòng kèm 2 đuôi ruy-băng */}
          <g transform="translate(26, 38)">
            {/* Đuôi ruy-băng dài buông xuống chếch nhẹ sang trái, đi thấp hơn đáy chữ, đầu đuôi cắt chéo */}
            <path
              d="M6 8C5 14 1 20 -4 28L-9 24C-4 17 -1 12 2 7Z"
              fill={pinkBase}
              stroke={pinkStroke}
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            {/* Đuôi ngắn nhô sang phải */}
            <path
              d="M9 7C13 10 17 12 21 14L20 17C15 15 11 12 7 8Z"
              fill={pinkHighlight}
              stroke={pinkStroke}
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            {/* Hai cánh nơ nhỏ xinh */}
            <ellipse cx="4" cy="5" rx="5" ry="3.2" transform="rotate(-25 4 5)" fill={pinkBase} stroke={pinkStroke} strokeWidth="1.4" />
            <ellipse cx="12" cy="6" rx="4.8" ry="3" transform="rotate(25 12 6)" fill={pinkHighlight} stroke={pinkStroke} strokeWidth="1.4" />
            {/* Nút thắt nơ trung tâm */}
            <circle cx="8" cy="6" r="3.2" fill={pinkBase} stroke={pinkStroke} strokeWidth="1.5" />
          </g>
        </g>

        {/* --- 4. Wordmark: "néa" Brush Script --- */}
        {/* Nối liền, nét liền nhau, chữ a kết thúc bằng nét hất đuôi lên bên phải */}
        <text
          x="142"
          y="58"
          fontFamily="'Pacifico', 'Nunito', cursive, sans-serif"
          fontWeight="900"
          fontSize="54"
          fill={blueColor}
          style={{ letterSpacing: '-0.5px' }}
        >
          néa
        </text>

        {/* --- 5. Sparkle Stars at the Right of 'a' --- */}
        {/* Ngôi sao hồng 4 cánh lớn */}
        <path
          d="M272 23C272 26.5 275.5 29 279 29C275.5 29 272 31.5 272 35C272 31.5 268.5 29 265 29C268.5 29 272 26.5 272 23Z"
          fill={isWhite ? '#FFFFFF' : isDark ? '#444444' : '#FF70A6'}
        />
        {/* Ngôi sao xanh nhỏ hơn */}
        <path
          d="M286 33C286 35.5 288.5 37 291 37C288.5 37 286 38.5 286 41C286 38.5 283.5 37 281 37C283.5 37 286 35.5 286 33Z"
          fill={blueColor}
        />

        {/* --- 6. Slogan: "— Scrunchies for your everyday vibe —" --- */}
        {showTagline && (
          <g transform="translate(0, 88)">
            {/* Gạch ngang trái (chiếm ~7% chiều rộng) */}
            <line
              x1="38"
              y1="0"
              x2="60"
              y2="0"
              stroke={blueColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Slogan text: font Patrick Hand/Short Stack, #7BA7DE, letter-spacing 0.08em */}
            <text
              x="154"
              y="3.5"
              textAnchor="middle"
              fontFamily="'Patrick Hand', 'Nunito', cursive, sans-serif"
              fontSize="12.5"
              fontWeight="600"
              letterSpacing="0.08em"
              fill={blueColor}
            >
              Scrunchies for your everyday vibe
            </text>

            {/* Gạch ngang phải (chiếm ~7% chiều rộng) */}
            <line
              x1="248"
              y1="0"
              x2="270"
              y2="0"
              stroke={blueColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

// Also export BloneaLogo as an alias for backwards compatibility
export const BloneaLogo = Logo;
