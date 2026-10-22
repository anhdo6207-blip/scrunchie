export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Kiểu tóc' | 'Phối đồ' | 'Chăm sóc & bảo quản scrunchie' | 'Xu hướng';
  excerpt: string;
  date: string;
  readTime: string;
  coverImage: string;
  author: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      paragraphs: string[];
      bulletPoints?: string[];
    }[];
    outro: string;
  };
  featuredProductIds: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: '5-kieu-bui-toc-voi-scrunchie-cho-ngay-di-hoc',
    title: '5 kiểu búi tóc với scrunchie cho ngày đi học vừa xinh vừa gọn',
    category: 'Kiểu tóc',
    excerpt: 'Những cách tạo kiểu búi củ tỏi, buộc nửa đầu hay búi thấp với scrunchie pastel giúp bạn gái ghi điểm dễ thương trên giảng đường mà không tốn quá 2 phút.',
    date: '14/10/2026',
    readTime: '3 phút đọc',
    coverImage: '/src/assets/images/lua_basic_lifestyle_1792256760178.jpg',
    author: 'Minh Thư (Stylist Blonéa)',
    content: {
      intro: 'Mỗi buổi sáng chuẩn bị đi học hay đi làm thêm, một kiểu tóc vừa gọn gàng vừa có điểm nhấn điệu đà sẽ giúp bạn tràn đầy năng lượng tích cực suốt cả ngày. Dưới đây là 5 biến tấu siêu đơn giản cùng scrunchie Blonéa.',
      sections: [
        {
          heading: '1. Tóc búi củ tỏi cao (Top Knot) tiểu thư',
          paragraphs: [
            'Kiểu tóc kinh điển giải nhiệt mùa hè và khoe trọn đường nét gương mặt sáng ráo. Gom toàn bộ tóc lên đỉnh đầu, cuộn tròn tự nhiên và cố định bằng một chiếc Scrunchie Voan Mộng hoặc Lụa Satin size M/L.',
            'Độ phồng của lớp voan sẽ giúp búi tóc trông dày dặn và khuôn mặt nhỏ nhắn hơn hẳn.',
          ],
          bulletPoints: [
            'Dùng tay gom tóc thay vì lược để tạo độ phồng lơi tự nhiên.',
            'Kéo nhẹ vài sợi tóc mai quanh trán để tạo nét mềm mại.',
          ],
        },
        {
          heading: '2. Tóc buộc nửa đầu (Half-up) nàng thơ',
          paragraphs: [
            'Lấy một phần tóc phía trên mang tai, buộc nhẹ nhàng ở ngang tầm mắt. Kiểu tóc này cực kỳ hợp với Scrunchie Viền Contrast hoặc Scrunchie Vải Thô Basic tông kem.',
          ],
        },
        {
          heading: '3. Tóc đuôi ngựa thấp buộc lệch nhẹ',
          paragraphs: [
            'Dành cho những ngày diện áo sơ mi hay áo phông basic. Một chiếc Scrunchie Lụa Basic màu xanh baby hoặc hồng pastel sẽ mang lại cảm giác thanh lịch, chững chạc.',
          ],
        },
        {
          heading: '4. Tóc tết đuôi sam lơi kèm scrunchie',
          paragraphs: [
            'Tết tóc 3 lỏng tay, dùng scrunchie cố định ở phần đuôi tóc. Nếp nhún bồng bềnh của scrunchie giúp phần đuôi tóc không bị đơn điệu.',
          ],
        },
        {
          heading: '5. Đeo cổ tay làm phụ kiện thời trang',
          paragraphs: [
            'Khi thả tóc, bạn chỉ cần lồng chiếc scrunchie vào cổ tay như một chiếc lắc tay vải ngọt ngào. Tiện lợi để buộc gọn tóc bất cứ lúc nào cần học tập hay ăn uống.',
          ],
        },
      ],
      outro: 'Chỉ với một chiếc scrunchie nhỏ xinh từ Blonéa, bạn đã có thể biến hóa mái tóc trở nên cuốn hút mỗi ngày. Hãy thử ngay hôm nay nhé!',
    },
    featuredProductIds: ['sp-1', 'sp-5', 'sp-6'],
  },
  {
    id: 'post-2',
    slug: 'phoi-scrunchie-pastel-voi-outfit-thuong-ngay',
    title: 'Phối scrunchie pastel với outfit thường ngày: Bí quyết từ nhạt tới nổi',
    category: 'Phối đồ',
    excerpt: 'Cách mix & match 4 gam màu signature Blonéa (Xanh baby, Hồng pastel, Vàng nhạt, Xám nhạt) với đồng phục, đồ thể thao và váy hoa dạo phố.',
    date: '10/10/2026',
    readTime: '4 phút đọc',
    coverImage: '/src/assets/images/scrunchie_combo_pastel_1792254796204.jpg',
    author: 'Lan Anh (Blonéa Fashion)',
    content: {
      intro: 'Gam màu pastel luôn mang lại cảm giác dễ chịu, nữ tính và rất dễ ứng dụng. Cùng khám phá bí kíp chọn màu scrunchie ăn rơ hoàn hảo với từng phong cách thường ngày.',
      sections: [
        {
          heading: '1. Xanh baby (Baby Blue) – Dịu mát cùng denim và sơ mi trắng',
          paragraphs: [
            'Xanh baby là màu sắc mang tinh thần thanh xuân tươi mát. Khi phối cùng áo sơ mi trắng đi học hoặc quần jeans xanh denim, chiếc scrunchie tạo nên sự liền mạch màu sắc vô cùng tinh tế.',
          ],
        },
        {
          heading: '2. Hồng pastel (Pastel Pink) – Ngọt ngào cho những buổi hẹn hò',
          paragraphs: [
            'Tông hồng pastel của Blonéa được căn chỉnh dịu mắt, không hề sến súa. Thích hợp nhất khi bạn diện váy babydoll trắng, áo len cardigan be kem hoặc đồ kẻ caro.',
          ],
        },
        {
          heading: '3. Vàng chanh nhạt (Lemon Yellow) – Nguồn năng lượng tích cực',
          paragraphs: [
            'Một điểm nhấn ấm áp cho những ngày trời thu đông se lạnh hoặc những buổi hoạt động ngoài trời năng động.',
          ],
        },
      ],
      outro: 'Hãy tự do sáng tạo bản phối màu cho riêng mình, bởi thời trang đẹp nhất là khi bạn cảm thấy vui vẻ và tự tin nhất!',
    },
    featuredProductIds: ['sp-10', 'sp-3', 'sp-4'],
  },
  {
    id: 'post-3',
    slug: 'cach-giat-va-bao-quan-scrunchie-lua',
    title: 'Cách giặt và bảo quan scrunchie lụa satin luôn bóng mượt như mới',
    category: 'Chăm sóc & bảo quản scrunchie',
    excerpt: 'Học cách giặt tay dịu nhẹ với dầu gội và phơi trong bóng râm để giữ chun co giãn bền bỉ và lớp vải lụa không bao giờ bị xước hay phai màu.',
    date: '05/10/2026',
    readTime: '3 phút đọc',
    coverImage: '/src/assets/images/lua_basic_texture_1792256760116.jpg',
    author: 'Đội ngũ R&D Blonéa',
    content: {
      intro: 'Scrunchie lụa satin là “vũ khí bí mật” giúp mái tóc không bị gãy nếp hay xơ rối. Để bảo vệ phụ kiện yêu thích này luôn giữ được form dáng và độ óng mượt, hãy ghi nhớ những mẹo nhỏ sau đây.',
      sections: [
        {
          heading: '1. Luôn giặt bằng nước mát và xà phòng dịu nhẹ',
          paragraphs: [
            'Vải lụa satin rất kỵ nước nóng và chất tẩy rửa mạnh. Thay vì dùng xà phòng giặt đồ thông thường, bạn nên dùng một giọt sữa tắm hoặc dầu gội đầu hòa tan trong nước mát để giặt nhẹ nhàng.',
          ],
        },
        {
          heading: '2. Không vặn xoắn mạnh tay',
          paragraphs: [
            'Sau khi xả sạch nước, bạn dùng một chiếc khăn bông khô thấm bớt nước trên scrunchie, vuốt nhẹ cho các múi vải phồng đều trở lại.',
          ],
        },
        {
          heading: '3. Phơi nơi thoáng gió, tránh ánh nắng gay gắt',
          paragraphs: [
            'Ánh nắng trực tiếp ở nhiệt độ cao có thể làm sợi lụa giòn và phai màu. Hãy phơi scrunchie trên khay phẳng ở nơi có gió thoáng mát trong nhà.',
          ],
        },
      ],
      outro: 'Chỉ với 2 phút chăm sóc mỗi tuần, những chiếc scrunchie lụa Blonéa sẽ luôn bền đẹp và đồng hành cùng mái tóc của bạn suốt cả năm.',
    },
    featuredProductIds: ['sp-1', 'sp-7'],
  },
  {
    id: 'post-4',
    slug: 'chon-scrunchie-theo-chat-lieu-va-size',
    title: 'Chọn scrunchie chuẩn form: Hướng dẫn theo chất liệu vải và size tóc',
    category: 'Xu hướng',
    excerpt: 'Tóc dày nên chọn size L hay M? Khi nào nên dùng vải nhung, khi nào dùng vải thô? Cẩm nang chọn mua không bao giờ hối tiếc.',
    date: '01/10/2026',
    readTime: '4 phút đọc',
    coverImage: '/src/assets/images/lua_basic_angle_1792256758607.jpg',
    author: 'Blonéa Studio',
    content: {
      intro: 'Mỗi mái tóc mang một kết cấu và độ dày khác nhau. Việc chọn đúng kích cỡ S/M/L cùng chất liệu phù hợp sẽ giúp chiếc scrunchie giữ tóc vừa vặn nhất.',
      sections: [
        {
          heading: '1. Hiểu đúng về bảng kích cỡ S, M, L tại Blonéa',
          paragraphs: [
            'Size S (8-9cm): Nhỏ gọn, dành cho tóc mỏng, tóc ngắn hoặc các kiểu buộc nửa đầu.',
            'Size M (11-12cm): Chuẩn quốc dân, cân mọi độ dày tóc phổ biến.',
            'Size L (14-15cm): Bồng bềnh tiểu thư, ôm trọn mái tóc dày hoặc tóc uốn xoăn sóng to.',
          ],
        },
        {
          heading: '2. Chọn theo từng mùa trong năm',
          paragraphs: [
            'Mùa hè: Ưu tiên vải lạnh, vải voan mỏng và cotton caro thấm hút tốt.',
            'Mùa thu đông: Chất nhung tơ mềm mại và lụa satin cao cấp đem lại cảm giác ấm áp và sang chảnh.',
          ],
        },
      ],
      outro: 'Đừng ngần ngại liên hệ bộ phận tư vấn của Blonéa nếu bạn cần gợi ý chi tiết cho độ dài mái tóc của mình nhé!',
    },
    featuredProductIds: ['sp-8', 'sp-5', 'sp-3'],
  },
  {
    id: 'post-5',
    slug: 'goi-y-qua-tang-nho-xinh-cho-ban-than',
    title: 'Gợi ý hộp quà nhỏ xinh trao gửi bạn thân nhân dịp sinh nhật & ngày lễ',
    category: 'Phối đồ',
    excerpt: 'Tự tay chuẩn bị set quà ngọt ngào với combo scrunchie pastel, thiệp viết tay và hộp đựng thắt nơ tinh tế để làm ấm lòng cô bạn thân.',
    date: '25/09/2026',
    readTime: '3 phút đọc',
    coverImage: '/src/assets/images/set_3_sweet_vibes_1792254815816.jpg',
    author: 'Minh Thư (Stylist Blonéa)',
    content: {
      intro: 'Đôi khi món quà ý nghĩa nhất không nằm ở giá trị đắt đỏ mà ở sự tinh tế và thấu hiểu. Những chiếc scrunchie xinh xắn gói kèm nơ ngọt ngào là lựa chọn số một cho ngày sinh nhật của bạn thân.',
      sections: [
        {
          heading: '1. Set 3 Sweet Vibes – Món quà ngọt ngào vừa túi tiền',
          paragraphs: [
            'Với mức giá chỉ 69.000đ, set 3 chiếc gồm hồng pastel, xanh baby và vàng nhạt được đóng gói kèm ruy băng "with love" xinh xắn sẵn sàng trao tay.',
          ],
        },
        {
          heading: '2. Combo 4 Pastel – Cùng nhau làm điệu cả tuần',
          paragraphs: [
            'Bạn có thể tặng bạn thân 2 chiếc và giữ lại 2 chiếc làm scrunchie đôi – biểu tượng tình bạn gắn bó qua năm tháng học trò.',
          ],
        },
      ],
      outro: 'Hãy để Blonéa cùng bạn gửi trao những yêu thương dịu dàng nhất đến người bạn tri kỷ nhé!',
    },
    featuredProductIds: ['sp-9', 'sp-10'],
  },
];
