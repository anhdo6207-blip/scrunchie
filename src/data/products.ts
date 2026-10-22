export interface GallerySlot {
  type: 'overview' | 'angle' | 'texture' | 'details' | 'lifestyle';
  label: string;
  shortLabel: string;
  image?: string;
}

export type MaterialFilterType =
  | 'all'
  | 'lua'
  | 'cotton'
  | 'tho'
  | 'voan'
  | 'nhung'
  | 'lanh'
  | 'combo';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'lua' | 'vai' | 'basic' | 'nhung-voan' | 'combo';
  categoryName: string;
  materialType: MaterialFilterType;
  materialTypeName: string;
  shortDescription: string;
  description: string;
  material: string;
  careGuide: string;
  colors: string[];
  colorHexes: { [colorName: string]: string };
  basePrice: number; // Size M price (mặc định)
  originalPrice?: number; // Size M original price
  discountAmount?: number;
  badge?: 'Ưu đãi' | 'Bán chạy' | 'Combo Tiết Kiệm' | 'Mới';
  isCombo?: boolean;
  comboSaving?: number;
  comboOriginalTotal?: number;
  primaryImage: string;
  gallerySlots: GallerySlot[];
  colorGalleries?: {
    [colorName: string]: {
      primaryImage: string;
      gallerySlots: GallerySlot[];
    };
  };
  features: string[];
  bestFor: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 'sp-1',
    name: 'Scrunchie Lụa Basic',
    slug: 'scrunchie-lua-basic',
    category: 'lua',
    categoryName: 'Scrunchie Lụa',
    materialType: 'lua',
    materialTypeName: 'Lụa',
    shortDescription: 'Chất liệu lụa satin mềm mịn, êm ái cho tóc, hạn chế nếp gãy và ma sát.',
    description: 'Chiếc scrunchie lụa basic kinh điển của Blonéa được may từ vải lụa mềm mại với độ bóng tinh tế. Thun co giãn đàn hồi cao giúp cố định tóc chắc chắn nhưng không làm đau chân tóc hay để lại nếp hằn sau nhiều giờ sử dụng.',
    material: 'Vải lụa satin nhân tạo mềm mịn, chun cao su tự nhiên co giãn đàn hồi tốt.',
    careGuide: 'Nên giặt tay nhẹ nhàng với nước mát và sữa tắm hoặc dầu gội dịu nhẹ. Không vắt mạnh, phơi nơi thoáng gió tránh ánh nắng gắt.',
    colors: ['Xanh Baby', 'Hồng Pastel', 'Vàng Nhạt', 'Xám Khói'],
    colorHexes: {
      'Xanh Baby': '#A7C8F0',
      'Hồng Pastel': '#FFBFD9',
      'Vàng Nhạt': '#FFFA8A',
      'Xám Khói': '#C8C8D4',
    },
    basePrice: 25000, // Size M (S: 20k, L: 30k)
    badge: 'Bán chạy',
    rating: 4.9,
    reviewCount: 138,
    primaryImage: '/src/assets/images/scrunchie_lua_basic_1792254794782.jpg',
    gallerySlots: [
      {
        type: 'overview',
        label: '1. Tổng thể sản phẩm',
        shortLabel: 'Tổng thể',
        image: '/src/assets/images/scrunchie_lua_basic_1792254794782.jpg',
      },
      {
        type: 'angle',
        label: '2. Góc chụp khác (Độ phồng)',
        shortLabel: 'Góc nghiêng',
        image: '/src/assets/images/lua_basic_angle_1792256758607.jpg',
      },
      {
        type: 'texture',
        label: '3. Cận cảnh chất liệu vải lụa',
        shortLabel: 'Bề mặt vải',
        image: '/src/assets/images/lua_basic_texture_1792256760116.jpg',
      },
      {
        type: 'details',
        label: '4. Chi tiết đường may & nếp gấp',
        shortLabel: 'Đường may',
        image: '/src/assets/images/lua_basic_stitch_1792256760519.jpg',
      },
      {
        type: 'lifestyle',
        label: '5. Sử dụng thực tế / Buộc tóc',
        shortLabel: 'Lifestyle',
        image: '/src/assets/images/lua_basic_lifestyle_1792256760178.jpg',
      },
    ],
    colorGalleries: {
      'Hồng Pastel': {
        primaryImage: '/src/assets/images/lua_basic_pink_overview_1792256760415.jpg',
        gallerySlots: [
          {
            type: 'overview',
            label: '1. Tổng thể sản phẩm (Hồng Pastel)',
            shortLabel: 'Tổng thể',
            image: '/src/assets/images/lua_basic_pink_overview_1792256760415.jpg',
          },
          {
            type: 'angle',
            label: '2. Góc chụp khác',
            shortLabel: 'Góc nghiêng',
            image: '/src/assets/images/scrunchie_vai_lanh_1792254814473.jpg',
          },
          {
            type: 'texture',
            label: '3. Cận cảnh chất liệu',
            shortLabel: 'Chất vải',
            image: '/src/assets/images/scrunchie_lua_satin_cao_cap_1792254815761.jpg',
          },
          {
            type: 'details',
            label: '4. Chi tiết may & nếp gấp',
            shortLabel: 'Đường may',
            image: undefined,
          },
          {
            type: 'lifestyle',
            label: '5. Ảnh thực tế',
            shortLabel: 'Lifestyle',
            image: undefined,
          },
        ],
      },
      'Xanh Baby': {
        primaryImage: '/src/assets/images/scrunchie_lua_basic_1792254794782.jpg',
        gallerySlots: [
          {
            type: 'overview',
            label: '1. Tổng thể sản phẩm (Xanh Baby)',
            shortLabel: 'Tổng thể',
            image: '/src/assets/images/scrunchie_lua_basic_1792254794782.jpg',
          },
          {
            type: 'angle',
            label: '2. Góc chụp khác',
            shortLabel: 'Góc nghiêng',
            image: '/src/assets/images/lua_basic_angle_1792256758607.jpg',
          },
          {
            type: 'texture',
            label: '3. Cận cảnh chất liệu',
            shortLabel: 'Chất vải',
            image: '/src/assets/images/lua_basic_texture_1792256760116.jpg',
          },
          {
            type: 'details',
            label: '4. Chi tiết may & nếp gấp',
            shortLabel: 'Đường may',
            image: '/src/assets/images/lua_basic_stitch_1792256760519.jpg',
          },
          {
            type: 'lifestyle',
            label: '5. Ảnh thực tế',
            shortLabel: 'Lifestyle',
            image: '/src/assets/images/lua_basic_lifestyle_1792256760178.jpg',
          },
        ],
      },
    },
    features: ['Êm dịu với da đầu', 'Không để lại nếp gãy tóc', 'Độ bóng mượt tự nhiên', 'Thun đàn hồi bền bỉ'],
    bestFor: 'Đeo hằng ngày đi học, đi làm hoặc buộc tóc củ tỏi gọn gàng.',
    inStock: true,
  },
  {
    id: 'sp-2',
    name: 'Scrunchie Vải Thô Basic',
    slug: 'scrunchie-vai-tho-basic',
    category: 'vai',
    categoryName: 'Scrunchie Vải',
    materialType: 'tho',
    materialTypeName: 'Vải thô',
    shortDescription: 'Vải thô mộc mạc tự nhiên, phong cách vintage Hàn Quốc nhẹ nhàng.',
    description: 'Scrunchie vải thô mộc Blonéa mang hơi thở mộc mạc tối giản. Từng nếp nhăn tự nhiên của sợi vải thô kết hợp với gam màu kem ấm tạo nên phụ kiện vừa vặn cho những ngày phối đồ phong cách nhẹ nhàng vintage.',
    material: 'Vải thô cotton tự nhiên dệt thoáng khí, chun bọc vải mềm.',
    careGuide: 'Giặt tay hoặc cho vào túi giặt chế độ nhẹ. Phơi khô tự nhiên trong bóng râm.',
    colors: ['Kem Tự Nhiên'],
    colorHexes: {
      'Kem Tự Nhiên': '#F4EFE6',
    },
    basePrice: 28000, // S: 23k, M: 28k, L: 33k
    rating: 4.8,
    reviewCount: 92,
    primaryImage: '/src/assets/images/scrunchie_vai_tho_1792254814143.jpg',
    gallerySlots: [
      {
        type: 'overview',
        label: '1. Tổng thể sản phẩm',
        shortLabel: 'Tổng thể',
        image: '/src/assets/images/scrunchie_vai_tho_1792254814143.jpg',
      },
      {
        type: 'angle',
        label: '2. Góc chụp khác (Độ phồng mộc mạc)',
        shortLabel: 'Góc nghiêng',
        image: '/src/assets/images/scrunchie_vien_contrast_1792254814986.jpg',
      },
      {
        type: 'texture',
        label: '3. Cận cảnh sợi vải thô dệt',
        shortLabel: 'Chất vải',
        image: undefined,
      },
      {
        type: 'details',
        label: '4. Chi tiết đường may viền',
        shortLabel: 'Đường may',
        image: undefined,
      },
      {
        type: 'lifestyle',
        label: '5. Phối đồ phong cách vintage',
        shortLabel: 'Lifestyle',
        image: undefined,
      },
    ],
    features: ['Chất vải thô thoáng khí', 'Độ bám tóc tốt không trơn tuột', 'Tông màu kem mộc mạc', 'Phù hợp style vintage'],
    bestFor: 'Tóc búi thấp, kẹp nửa đầu hoặc phối cùng váy đầm mộc mạc.',
    inStock: true,
  },
  {
    id: 'sp-3',
    name: 'Scrunchie Cotton Caro',
    slug: 'scrunchie-cotton-caro',
    category: 'basic',
    categoryName: 'Scrunchie Basic',
    materialType: 'cotton',
    materialTypeName: 'Vải cotton',
    shortDescription: 'Họa tiết caro xanh baby năng động, trẻ trung và đáng yêu cho bạn gái.',
    description: 'Họa tiết gingham caro màu xanh baby tươi sáng kết hợp trên nền vải cotton mềm mại. Thiết kế xếp phồng đều đặn tạo điểm nhấn nổi bật trên mái tóc, vừa ngọt ngào vừa năng động khi dạo phố hay đến trường.',
    material: '100% Cotton họa tiết caro gingham, đường may viền tỉ mỉ.',
    careGuide: 'Có thể giặt máy với túi giặt. Tránh chất tẩy mạnh để giữ màu caro luôn tươi sáng.',
    colors: ['Xanh Baby'],
    colorHexes: {
      'Xanh Baby': '#A7C8F0',
    },
    basePrice: 30000, // S: 25k, M: 30k, L: 35k
    badge: 'Mới',
    rating: 4.8,
    reviewCount: 65,
    primaryImage: '/src/assets/images/scrunchie_cotton_caro_1792254795566.jpg',
    gallerySlots: [
      {
        type: 'overview',
        label: '1. Tổng thể sản phẩm (Caro Xanh)',
        shortLabel: 'Tổng thể',
        image: '/src/assets/images/scrunchie_cotton_caro_1792254795566.jpg',
      },
      {
        type: 'angle',
        label: '2. Góc chụp khác',
        shortLabel: 'Góc nghiêng',
        image: undefined,
      },
      {
        type: 'texture',
        label: '3. Cận cảnh sợi cotton dệt caro',
        shortLabel: 'Họa tiết',
        image: undefined,
      },
      {
        type: 'details',
        label: '4. Chi tiết nếp nhún ruffles',
        shortLabel: 'Đường may',
        image: undefined,
      },
      {
        type: 'lifestyle',
        label: '5. Đeo tóc đuôi ngựa năng động',
        shortLabel: 'Lifestyle',
        image: undefined,
      },
    ],
    features: ['Họa tiết gingham năng động', 'Cotton thấm hút tốt', 'Form phồng đều xinh xắn', 'Không xù lông'],
    bestFor: 'Tóc đuôi ngựa cao, tóc tết hai bên, đồ thể thao hoặc đồng phục học sinh.',
    inStock: true,
  },
  {
    id: 'sp-4',
    name: 'Scrunchie Vải Lạnh',
    slug: 'scrunchie-vai-lanh',
    category: 'vai',
    categoryName: 'Scrunchie Vải',
    materialType: 'lanh',
    materialTypeName: 'Vải lạnh',
    shortDescription: 'Cảm giác mát mịn trên tay, tông hồng pastel ngọt ngào, tạo nếp bồng bềnh.',
    description: 'Chất vải thun lạnh mịn mượt đem lại cảm giác mát mẻ khi chạm vào. Tông màu hồng pastel nhẹ nhàng tôn lên nét nữ tính, giúp mái tóc thêm bồng bềnh và duyên dáng suốt ngày dài.',
    material: 'Vải thun lạnh poly-spandex cao cấp mềm mượt mát rượi.',
    careGuide: 'Giặt nước lạnh, không dùng bàn ủi nóng trực tiếp lên bề mặt vải.',
    colors: ['Hồng Pastel'],
    colorHexes: {
      'Hồng Pastel': '#FFBFD9',
    },
    basePrice: 32000, // S: 27k, M: 32k, L: 37k
    rating: 4.8,
    reviewCount: 74,
    primaryImage: '/src/assets/images/scrunchie_vai_lanh_1792254814473.jpg',
    gallerySlots: [
      {
        type: 'overview',
        label: '1. Tổng thể sản phẩm',
        shortLabel: 'Tổng thể',
        image: '/src/assets/images/scrunchie_vai_lanh_1792254814473.jpg',
      },
      {
        type: 'angle',
        label: '2. Góc chụp khác',
        shortLabel: 'Góc nghiêng',
        image: undefined,
      },
      {
        type: 'texture',
        label: '3. Cận cảnh độ rủ mát mịn',
        shortLabel: 'Chất vải',
        image: undefined,
      },
      {
        type: 'details',
        label: '4. Chi tiết đường may giấu chỉ',
        shortLabel: 'Đường may',
        image: undefined,
      },
      {
        type: 'lifestyle',
        label: '5. Đeo cổ tay & buộc tóc',
        shortLabel: 'Lifestyle',
        image: undefined,
      },
    ],
    features: ['Bề mặt mịn lạnh thoáng mát', 'Tông hồng pastel nịnh mắt', 'Co giãn 4 chiều mềm mại', 'Độ bồng vừa phải'],
    bestFor: 'Mùa hè năng động, buộc tóc tập thể thao hoặc làm phụ kiện đeo cổ tay.',
    inStock: true,
  },
  {
    id: 'sp-5',
    name: 'Scrunchie Voan Mộng',
    slug: 'scrunchie-voan-mong',
    category: 'nhung-voan',
    categoryName: 'Scrunchie Nhung & Voan',
    materialType: 'voan',
    materialTypeName: 'Vải voan',
    shortDescription: 'Chất voan organza trong mờ bồng bềnh, sắc xám tím nhạt thanh lịch tiểu thư.',
    description: 'Được dệt từ chất liệu voan trong mờ mềm mại, Scrunchie Voan Mộng của Blonéa mang lại vẻ đẹp bay bổng như mây. Tông sắc xám tím nhạt pastel kiêu kỳ giúp bạn biến hóa thành nàng thơ chỉ trong tích tắc.',
    material: 'Vải voan organza mỏng nhẹ cao cấp, độ rủ tự nhiên.',
    careGuide: 'Giặt nhẹ bằng tay, không vắt xoắn, tránh va quẹt với vật sắc nhọn.',
    colors: ['Xám Tím Nhạt'],
    colorHexes: {
      'Xám Tím Nhạt': '#D2C8E4',
    },
    basePrice: 35000, // S: 30k, M: 35k, L: 40k
    rating: 4.9,
    reviewCount: 112,
    primaryImage: '/src/assets/images/scrunchie_voan_mong_1792254795559.jpg',
    gallerySlots: [
      {
        type: 'overview',
        label: '1. Tổng thể sản phẩm',
        shortLabel: 'Tổng thể',
        image: '/src/assets/images/scrunchie_voan_mong_1792254795559.jpg',
      },
      {
        type: 'angle',
        label: '2. Góc chụp khác',
        shortLabel: 'Góc nghiêng',
        image: undefined,
      },
      {
        type: 'texture',
        label: '3. Cận cảnh độ trong mờ organza',
        shortLabel: 'Độ trong',
        image: undefined,
      },
      {
        type: 'details',
        label: '4. Chi tiết đường cuốn biên tinh xảo',
        shortLabel: 'Cuốn biên',
        image: undefined,
      },
      {
        type: 'lifestyle',
        label: '5. Búi tóc phồng nàng thơ',
        shortLabel: 'Lifestyle',
        image: undefined,
      },
    ],
    features: ['Voan mỏng trong mờ mơ mộng', 'Sắc xám tím thanh lịch', 'Tạo độ phồng lớn tiểu thư', 'Cực nhẹ không nặng đầu'],
    bestFor: 'Tóc búi củ tỏi phồng lớn, đi tiệc, chụp ảnh dã ngoại hoặc hẹn hò.',
    inStock: true,
  },
  {
    id: 'sp-6',
    name: 'Scrunchie Viền Contrast',
    slug: 'scrunchie-vien-contrast',
    category: 'basic',
    categoryName: 'Scrunchie Basic',
    materialType: 'cotton',
    materialTypeName: 'Vải cotton',
    shortDescription: 'Gam màu kem thanh nhã điểm đường viền hồng pastel cuốn hút, tinh tế.',
    description: 'Sự kết hợp tinh tế giữa nền vải kem tự nhiên và đường viền hồng pastel may zíc-zắc tỉ mỉ. Chiếc scrunchie tạo hiệu ứng viền gợn sóng sinh động khi buộc tóc, mang lại nét chấm phá độc đáo cho phong cách thường nhật.',
    material: 'Vải sợi dệt tổng hợp mềm mịn với đường viền chỉ thêu tương phản.',
    careGuide: 'Giặt tay với nước lạnh, phơi ngang để giữ dáng viền sóng lượn.',
    colors: ['Kem viền hồng'],
    colorHexes: {
      'Kem viền hồng': '#FFF3E8',
    },
    basePrice: 38000, // S: 33k, M: 38k, L: 43k
    rating: 4.8,
    reviewCount: 88,
    primaryImage: '/src/assets/images/scrunchie_vien_contrast_1792254814986.jpg',
    gallerySlots: [
      {
        type: 'overview',
        label: '1. Tổng thể sản phẩm',
        shortLabel: 'Tổng thể',
        image: '/src/assets/images/scrunchie_vien_contrast_1792254814986.jpg',
      },
      {
        type: 'angle',
        label: '2. Góc chụp khác',
        shortLabel: 'Góc nghiêng',
        image: undefined,
      },
      {
        type: 'texture',
        label: '3. Cận cảnh đường viền contrast',
        shortLabel: 'Viền chỉ',
        image: undefined,
      },
      {
        type: 'details',
        label: '4. Chi tiết nếp gấp bèo nhún',
        shortLabel: 'Đường may',
        image: undefined,
      },
      {
        type: 'lifestyle',
        label: '5. Buộc tóc nửa đầu dịu dàng',
        shortLabel: 'Lifestyle',
        image: undefined,
      },
    ],
    features: ['Viền bèo tương phản nổi bật', 'Chất vải êm ái thoáng mát', 'Đường kim mũi chỉ sắc sảo', 'Thiết kế độc quyền'],
    bestFor: 'Tóc buộc nửa đầu, tóc đuôi ngựa thấp phong cách thanh lịch công sở & giảng đường.',
    inStock: true,
  },
  {
    id: 'sp-7',
    name: 'Scrunchie Lụa Satin cao cấp',
    slug: 'scrunchie-lua-satin-cao-cap',
    category: 'lua',
    categoryName: 'Scrunchie Lụa',
    materialType: 'lua',
    materialTypeName: 'Lụa',
    shortDescription: 'Lụa satin thượng hạng óng ả, bảo vệ tóc tối đa, giảm ma sát chống xơ rối.',
    description: 'Phiên bản nâng cấp cao cấp từ Blonéa với sợi lụa satin dệt mật độ cao bóng mượt lấp lánh dưới ánh sáng. Tông hồng pastel sang trọng, tạo cảm giác êm ái nâng niu từng sợi tóc, chống ma sát gãy rụng hiệu quả.',
    material: 'Lụa Satin dệt cao cấp óng ả, ruột thun bọc chỉ bảo vệ tóc.',
    careGuide: 'Giặt tay nước ấm nhẹ, không vặn vắt, bảo quản trong túi vải hoặc hộp đựng phụ kiện.',
    colors: ['Hồng Pastel'],
    colorHexes: {
      'Hồng Pastel': '#FFBFD9',
    },
    basePrice: 39000, // Size M (S: 34k, M: 39k, L: 44k)
    originalPrice: 45000, // Size M cũ 45k (S cũ 40k, L cũ 50k)
    discountAmount: 6000,
    badge: 'Ưu đãi',
    rating: 4.8,
    reviewCount: 124, // Matches 124 đánh giá from prompt!
    primaryImage: '/src/assets/images/scrunchie_lua_satin_cao_cap_1792254815761.jpg',
    gallerySlots: [
      {
        type: 'overview',
        label: '1. Tổng thể sản phẩm',
        shortLabel: 'Tổng thể',
        image: '/src/assets/images/scrunchie_lua_satin_cao_cap_1792254815761.jpg',
      },
      {
        type: 'angle',
        label: '2. Góc chụp khác',
        shortLabel: 'Góc nghiêng',
        image: undefined,
      },
      {
        type: 'texture',
        label: '3. Cận cảnh độ bóng satin óng ả',
        shortLabel: 'Độ bóng',
        image: undefined,
      },
      {
        type: 'details',
        label: '4. Chi tiết đường may ẩn cao cấp',
        shortLabel: 'Đường may',
        image: undefined,
      },
      {
        type: 'lifestyle',
        label: '5. Đeo khi skincare / búi tóc',
        shortLabel: 'Lifestyle',
        image: undefined,
      },
    ],
    features: ['Chất lụa satin óng ánh', 'Giảm 6.000 đ (~13%)', 'Bảo vệ tóc giảm gãy rụng', 'Đường may ẩn cao cấp'],
    bestFor: 'Chăm sóc tóc khi ngủ, buộc tóc khi skincare hoặc đi sự kiện sang trọng.',
    inStock: true,
  },
  {
    id: 'sp-8',
    name: 'Scrunchie Vải Nhung',
    slug: 'scrunchie-vai-nhung',
    category: 'nhung-voan',
    categoryName: 'Scrunchie Nhung & Voan',
    materialType: 'nhung',
    materialTypeName: 'Vải nhung',
    shortDescription: 'Nhung tơ mềm mịn mướt tay, sắc hồng phấn ấm áp và sang chảnh.',
    description: 'Chất liệu nhung tơ mịn màng bắt sáng nhẹ theo từng chuyển động. Sắc hồng phấn dịu ngọt mang đến cảm giác ấm áp và quý phái, là phụ kiện không thể thiếu cho những buổi dạo phố mùa thu đông.',
    material: 'Vải nhung tơ nhân tạo siêu mịn, lõi chun co giãn cao cấp.',
    careGuide: 'Dùng khăn ẩm vuốt nhẹ theo chiều sợi nhung hoặc giặt khô. Không dùng bàn ủi.',
    colors: ['Hồng Phấn'],
    colorHexes: {
      'Hồng Phấn': '#F6B7CB',
    },
    basePrice: 42000, // Size M (S: 37k, M: 42k, L: 47k)
    rating: 4.8,
    reviewCount: 96,
    primaryImage: '/src/assets/images/scrunchie_nhung_hong_1792254795945.jpg',
    gallerySlots: [
      {
        type: 'overview',
        label: '1. Tổng thể sản phẩm',
        shortLabel: 'Tổng thể',
        image: '/src/assets/images/scrunchie_nhung_hong_1792254795945.jpg',
      },
      {
        type: 'angle',
        label: '2. Góc chụp khác',
        shortLabel: 'Góc nghiêng',
        image: undefined,
      },
      {
        type: 'texture',
        label: '3. Cận cảnh tuyết nhung mướt mịn',
        shortLabel: 'Tuyết nhung',
        image: undefined,
      },
      {
        type: 'details',
        label: '4. Chi tiết đường may form dày',
        shortLabel: 'Form dáng',
        image: undefined,
      },
      {
        type: 'lifestyle',
        label: '5. Búi tóc phối đồ mùa đông',
        shortLabel: 'Lifestyle',
        image: undefined,
      },
    ],
    features: ['Chất nhung tuyết mịn tay', 'Độ bám tóc cực êm ái', 'Sắc hồng phấn sang trọng', 'Form tròn dày dặn'],
    bestFor: 'Tóc búi cao mùa lạnh, phối cùng áo len hoặc blazer dạ ấm áp.',
    inStock: true,
  },
  {
    id: 'sp-9',
    name: 'Set 3 Scrunchie Sweet Vibes',
    slug: 'set-3-scrunchie-sweet-vibes',
    category: 'combo',
    categoryName: 'Combo Tiết Kiệm',
    materialType: 'combo',
    materialTypeName: 'Combo ưu đãi',
    shortDescription: 'Combo 3 chiếc phối màu ngọt ngào, tiết kiệm ngay 6.000 VNĐ so với mua lẻ.',
    description: 'Bộ sưu tập Sweet Vibes gồm 3 chiếc scrunchie xinh xắn phối giữa các gam màu ngọt ngào: Hồng Pastel, Xanh Baby và Vàng Nhạt. Được gói thắt nơ xinh xắn, thích hợp để tự thưởng cho bản thân hoặc làm quà tặng bạn bè.',
    material: 'Vải lụa mềm & cotton tổng hợp thân thiện với tóc.',
    careGuide: 'Giặt tay nhẹ nhàng từng chiếc với nước mát.',
    colors: ['Hồng Pastel + Xanh Baby + Vàng Nhạt'],
    colorHexes: {
      'Hồng Pastel + Xanh Baby + Vàng Nhạt': '#FFBFD9',
    },
    basePrice: 69000, // Cố định
    originalPrice: 75000,
    comboSaving: 6000,
    comboOriginalTotal: 75000,
    isCombo: true,
    badge: 'Combo Tiết Kiệm',
    rating: 4.9,
    reviewCount: 156,
    primaryImage: '/src/assets/images/set_3_sweet_vibes_1792254815816.jpg',
    gallerySlots: [
      {
        type: 'overview',
        label: '1. Tổng thể combo 3 chiếc',
        shortLabel: 'Tổng thể set',
        image: '/src/assets/images/set_3_sweet_vibes_1792254815816.jpg',
      },
      {
        type: 'angle',
        label: '2. Góc chụp sắp đặt cùng đĩa gỗ',
        shortLabel: 'Sắp đặt',
        image: undefined,
      },
      {
        type: 'texture',
        label: '3. Cận cảnh 3 chất vải phối',
        shortLabel: 'Chất vải',
        image: undefined,
      },
      {
        type: 'details',
        label: '4. Chi tiết dây nơ quà tặng kèm tag',
        shortLabel: 'Tag nơ',
        image: undefined,
      },
      {
        type: 'lifestyle',
        label: '5. Ảnh thực tế làm quà tặng',
        shortLabel: 'Lifestyle',
        image: undefined,
      },
    ],
    features: ['Set 3 chiếc màu ngọt ngào', 'Tiết kiệm ngay 6.000 đ', 'Kèm tag ruy băng quà tặng', 'Dễ dàng thay đổi mỗi ngày'],
    bestFor: 'Quà tặng sinh nhật bạn gái, làm điệu cả tuần với nhiều outfit.',
    inStock: true,
  },
  {
    id: 'sp-10',
    name: 'COMBO 4 scrunchies pastel',
    slug: 'combo-4-scrunchie-pastel',
    category: 'combo',
    categoryName: 'Combo Tiết Kiệm',
    materialType: 'combo',
    materialTypeName: 'Combo ưu đãi',
    shortDescription: 'Trọn bộ 4 gam màu signature Blonéa: Xanh Baby, Hồng Pastel, Vàng Nhạt, Xám Nhạt. Tiết kiệm 21.000 VNĐ (~21%).',
    description: 'Siêu phẩm combo hot nhất của Blonéa tập hợp đầy đủ 4 màu sắc nhận diện thương hiệu: Xanh Baby, Hồng Pastel, Vàng Nhạt và Xám Nhạt. Mức giá ưu đãi đặc biệt 79.000 VNĐ giúp bạn tiết kiệm tới 21.000 VNĐ so với mua lẻ.',
    material: 'Vải lụa mịn và cotton cao cấp, mềm mại bảo vệ tóc.',
    careGuide: 'Giặt tay nhẹ nhàng bằng xà phòng loãng hoặc dầu gội đầu.',
    colors: ['Xanh Baby', 'Hồng Pastel', 'Vàng Nhạt', 'Xám Nhạt'],
    colorHexes: {
      'Xanh Baby': '#A7C8F0',
      'Hồng Pastel': '#FFBFD9',
      'Vàng Nhạt': '#FFFA8A',
      'Xám Nhạt': '#D9D9E3',
    },
    basePrice: 79000, // Cố định
    originalPrice: 100000,
    comboSaving: 21000,
    comboOriginalTotal: 100000,
    isCombo: true,
    badge: 'Bán chạy',
    rating: 5.0,
    reviewCount: 215,
    primaryImage: '/src/assets/images/scrunchie_combo_pastel_1792254796204.jpg',
    gallerySlots: [
      {
        type: 'overview',
        label: '1. Tổng thể 4 màu signature',
        shortLabel: 'Tổng thể set',
        image: '/src/assets/images/scrunchie_combo_pastel_1792254796204.jpg',
      },
      {
        type: 'angle',
        label: '2. Góc chụp phẳng trên đĩa gốm',
        shortLabel: 'Góc chụp',
        image: undefined,
      },
      {
        type: 'texture',
        label: '3. Cận cảnh thớ vải 4 màu',
        shortLabel: 'Bề mặt vải',
        image: undefined,
      },
      {
        type: 'details',
        label: '4. Chi tiết chun co giãn từng chiếc',
        shortLabel: 'Độ co giãn',
        image: undefined,
      },
      {
        type: 'lifestyle',
        label: '5. Phối màu theo ngày trong tuần',
        shortLabel: 'Lifestyle',
        image: undefined,
      },
    ],
    features: ['Đầy đủ 4 màu signature', 'Tiết kiệm tới 21.000 đ (~21%)', 'Bán chạy nhất tại Blonéa', 'Mix đồ 7 ngày không trùng lặp'],
    bestFor: 'Tất cả các bạn gái muốn sở hữu bộ sưu tập màu pastel hoàn chỉnh.',
    inStock: true,
  },
];

export const CATEGORIES = [
  { id: 'all', name: 'Tất cả sản phẩm', description: 'Trọn bộ sưu tập scrunchies xinh xắn của Blonéa' },
  { id: 'lua', name: 'Scrunchie Lụa', description: 'Mềm mại bảo vệ tóc, không gãy rụng, óng ả sang trọng' },
  { id: 'vai', name: 'Scrunchie Vải', description: 'Cotton caro và vải thô mộc vintage, trẻ trung năng động' },
  { id: 'nhung-voan', name: 'Nhung & Voan', description: 'Tiểu thư bồng bềnh, quyến rũ và thanh lịch' },
  { id: 'combo', name: 'Combo Tiết Kiệm', description: 'Set quà tặng ngọt ngào với mức giá siêu ưu đãi' },
];

export const MATERIAL_FILTERS: { id: MaterialFilterType; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'lua', label: 'Lụa' },
  { id: 'cotton', label: 'Vải cotton' },
  { id: 'tho', label: 'Vải thô' },
  { id: 'voan', label: 'Vải voan' },
  { id: 'nhung', label: 'Vải nhung' },
  { id: 'lanh', label: 'Vải lạnh' },
  { id: 'combo', label: 'Combo ưu đãi' },
];

export const BRAND_COLORS = [
  { name: 'Xanh Baby', hex: '#A7C8F0', meaning: 'Dịu dàng, năng động & tươi mát', ratio: '45%' },
  { name: 'Hồng Pastel', hex: '#FFBFD9', accentHex: '#FF9DC4', meaning: 'Nữ tính, nổi bật & ngọt ngào', ratio: '25%' },
  { name: 'Vàng Nhạt', hex: '#FFFA8A', meaning: 'Tươi sáng, vui vẻ & trẻ trung', ratio: '20%' },
  { name: 'Xám Nhạt', hex: '#D9D9E3', darkHex: '#333333', meaning: 'Hiện đại, dễ phối & cân bằng bố cục', ratio: '10%' },
  { name: 'Kem Tự Nhiên', hex: '#F4EFE6', meaning: 'Mộc mạc, vintage & tinh khôi', ratio: 'Nền' },
];

/**
 * Calculates item price based on selected size:
 * - Single item Size S = Base - 5.000đ
 * - Single item Size M = Base price (niêm yết)
 * - Single item Size L = Base + 5.000đ
 * - Combos are fixed price (no size variation)
 */
export function calculateItemPrice(product: Product, size: 'S' | 'M' | 'L'): number {
  if (product.isCombo) {
    return product.basePrice;
  }
  if (size === 'S') return Math.max(product.basePrice - 5000, 20000);
  if (size === 'L') return product.basePrice + 5000;
  return product.basePrice;
}

/**
 * Calculates original price based on selected size (if item is discounted)
 */
export function calculateOriginalPrice(product: Product, size: 'S' | 'M' | 'L'): number | undefined {
  if (!product.originalPrice) return undefined;
  if (product.isCombo) return product.originalPrice;
  if (size === 'S') return product.originalPrice - 5000;
  if (size === 'L') return product.originalPrice + 5000;
  return product.originalPrice;
}

/**
 * Calculates discount percent for a product and size
 */
export function calculateDiscountPercent(product: Product, size: 'S' | 'M' | 'L'): number {
  const current = calculateItemPrice(product, size);
  const orig = calculateOriginalPrice(product, size);
  if (!orig || orig <= current) return 0;
  return Math.round(((orig - current) / orig) * 100);
}

export function formatVND(amount: number): string {
  return amount.toLocaleString('vi-VN') + 'đ';
}
