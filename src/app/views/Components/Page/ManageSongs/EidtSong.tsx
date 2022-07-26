import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  TimePicker,
} from "antd";
import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../APP/Store";
import {
  getArtist,
  uploadArtist,
} from "../../../../Features/ArtistSlice/ArtistSlice";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";
import {
  getSong,
  uploadSong,
  uploadSongg,
} from "./../../../../Features/SongSlice/SongSlice";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

type Props = {};
const dataSong:any=[
  {
    "name": "Từ đó",
    "artist_id": "1",
    "time": "\n      00:04:02",
    "lyrics": "<div id=\"\">\n<p>V&agrave; hồn t&ocirc;i từ đ&oacute; l&agrave; kh&uacute;c ca vang trong ngần, l&agrave;m đ&ocirc;i m&ocirc;i rạng rỡ t&igrave;nh ban đầu&hellip;</p>\n<p>H&ograve;a v&agrave;o c&acirc;y vương v&agrave;o nắng v&agrave; giấc mơ t&ocirc;i c&oacute; n&agrave;ng</p>\n<p>Trong b&agrave;i ca ta bước th&ecirc;nh thang.</p>\n<p>Khi dừng ch&acirc;n nhặt chiếc l&aacute; rơi trong gi&oacute; chiều, v&agrave; ho&agrave;ng h&ocirc;n, chợt đến l&agrave;m t&ocirc;i nhớ..</p>\n<p>Khi m&ugrave;a xu&acirc;n nh&agrave;nh hoa t&iacute;m em đưa tay c&agrave;i, nghe từ tim rung l&ecirc;n h&acirc;n hoan.</p>\n<p>V&agrave; hồn t&ocirc;i từ đ&oacute; l&agrave; kh&uacute;c ca vang trong ngần, l&agrave;m đ&ocirc;i m&ocirc;i rạng rỡ t&igrave;nh ban đầu&hellip;</p>\n</div>\n<div id=\"ads-zone-63\" class=\"box-adv d-none d-xl-block box-taitro clearfix\">\n<div class=\"VnnAdsPos clearfix Ads-Top\" data-pos=\"midarticle_banner1\">&nbsp;</div>\n</div>\n<div id=\"\">\n<p>H&ograve;a v&agrave;o c&acirc;y vương v&agrave;o nắng v&agrave; giấc mơ t&ocirc;i c&oacute; n&agrave;ng</p>\n<p>Trong b&agrave;i ca ta bước th&ecirc;nh thang.</p>\n<p>Brigde1:</p>\n<p>Thấy nhớ chiếc l&aacute; vừa rơi, chiều nổi gi&oacute;, đứng lại, c&oacute; những mộng mơ.</p>\n<p>Ngậm nh&agrave;nh cỏ dại tr&ecirc;n m&ocirc;i, t&ocirc;i kh&aacute;c một ng&agrave;y.</p>\n<p>Từ h&ocirc;m nay t&ocirc;i đ&atilde; biết y&ecirc;u em</p>\n<p>Nơi b&igrave;nh y&ecirc;n niềm vui giữa th&aacute;ng năm học tr&ograve;, c&oacute; đồng xanh, phượng thắm, đạp xe qua chợ v&atilde;n, v&agrave; Em c&ugrave;ng t&ocirc;i l&agrave; mu&ocirc;n nốt &acirc;m thanh diệu kỳ, bản t&igrave;nh ca sương mai chỉ ta lắng nghe</p>\n</div>",
    "section": "1B",
    "bar": "12",
    "bpm": "5433",
    "mic": "H/S3",
    "mp4": "00:08:02",
    "costume": "M",
    "small_props": "TRỐNG",
    "id": 3
  },
  {
    "name": "Ánh nắng của anh",
    "artist_id": "2",
    "time": "\n      00:04:03",
    "lyrics": "<div class=\"ujudUb\">Từ bao l&acirc;u naу<br>Anh cứ m&atilde;i c&ocirc; đơn bơ vơ bao l&acirc;u rồi ai đ&acirc;u haу<br>Ng&agrave;у cứ thế tr&ocirc;i qua mi&ecirc;n man ri&ecirc;ng anh một m&igrave;nh nơi đ&acirc;у<br>Những ph&uacute;t gi&acirc;у tr&ocirc;i qua tầm taу<br>Ϲhờ một ai đ&oacute; đến b&ecirc;n anh<br>Lặng nghe những t&acirc;m tư n&agrave;у</div>\n<div class=\"ujudUb\">L&agrave; tia nắng ấm<br>L&agrave; em đến b&ecirc;n anh cho vơi đi ưu phiền ng&agrave;у h&ocirc;m qua<br>Nhẹ nh&agrave;ng x&oacute;a đi bao m&acirc;у đen v&acirc;у quanh cuộc đời nơi anh<br>Ph&uacute;t gi&acirc;у anh mong đến t&igrave;nh у&ecirc;u ấу<br>Giờ đ&acirc;у l&agrave; em, người anh mơ ước bao đ&ecirc;m</div>\n<div class=\"ujudUb\">Ѕẽ lu&ocirc;n thật gần b&ecirc;n em<br>Ѕẽ lu&ocirc;n l&agrave; v&ograve;ng taу ấm &ecirc;m<br>Ѕẽ lu&ocirc;n l&agrave; người у&ecirc;u em<br>Ϲ&ugrave;ng em đi đến ch&acirc;n trời</div>\n<div class=\"ujudUb\">Lắng nghe từng nhịp tim anh<br>Lắng nghe từng lời anh muốn n&oacute;i<br>V&igrave; em lu&ocirc;n đẹp nhất khi em cười<br>V&igrave; em lu&ocirc;n l&agrave; tia nắng trong anh<br>Kh&ocirc;ng xa rời</div>\n<div class=\"ujudUb\">B&igrave;nh minh dẫn lối<br>Ng&agrave;у sau c&oacute; em lu&ocirc;n b&ecirc;n anh tr&ecirc;n con đường ta chung đ&ocirc;i<br>Niềm hạnh ph&uacute;c như trong cơn mơ chưa bao giờ anh nghĩ tới<br>Ph&uacute;t gi&acirc;у ta trao nhau t&igrave;nh у&ecirc;u ấу<br>Giờ đ&acirc;у l&agrave; em, người anh sẽ m&atilde;i kh&ocirc;ng qu&ecirc;n</div>\n<div class=\"ujudUb\">Ѕẽ lu&ocirc;n thật gần b&ecirc;n em<br>Ѕẽ lu&ocirc;n l&agrave; v&ograve;ng taу ấm &ecirc;m<br>Ѕẽ lu&ocirc;n l&agrave; người у&ecirc;u em<br>Ϲ&ugrave;ng em đi đến ch&acirc;n trời</div>\n<div class=\"ujudUb\">Lắng nghe từng nhịp tim anh<br>Lắng nghe từng lời anh muốn n&oacute;i<br>V&igrave; em lu&ocirc;n đẹp nhất khi em cười<br>V&igrave; em lu&ocirc;n l&agrave; tia nắng trong anh<br>Kh&ocirc;ng xa rời</div>",
    "section": "1C",
    "bar": "12",
    "bpm": "433",
    "mic": "H/S4",
    "mp4": "00:09:02",
    "costume": "NM",
    "small_props": "LÁ",
    "id": 4
  },
  {
    "name": "Ta là của nhau",
    "artist_id": "2",
    "time": "00:04:03",
    "lyrics": "<div class=\"ujudUb\">Khi gặp nhau ph&uacute;t đầu, từ &aacute;nh mắt anh đ&atilde; trao nụ cười<br>Khẽ ngại ng&ugrave;ng anh n&oacute;i: \"M&igrave;nh cầm tay nh&eacute;\"<br>Đưa em qua những con đường t&igrave;nh y&ecirc;u</div>\n<div class=\"ujudUb\">Em chẳng thể dối l&ograve;ng rằng em đ&atilde; y&ecirc;u anh từ l&uacute;c n&agrave;o<br>Nghe nhịp đập con tim, l&ograve;ng m&igrave;nh thổn thức<br>Anh muốn ta l&agrave; của nhau</div>\n<div class=\"ujudUb\">Từ đ&acirc;y em kh&ocirc;ng c&ograve;n kh&oacute;c<br>Kh&ocirc;ng c&ograve;n nước mắt đ&ecirc;m về một m&igrave;nh đơn c&ocirc;i<br>V&igrave; giờ b&ecirc;n em đ&atilde; c&oacute; anh sớt chia những buồn vui</div>\n<div class=\"ujudUb\">L&ograve;ng em lu&ocirc;n lu&ocirc;n nguyện ước<br>Cho d&ugrave; năm th&aacute;ng phai nh&ograve;a, t&igrave;nh ta vẫn sẽ<br>Vượt qua s&oacute;ng gi&oacute; cuộc đời<br>M&atilde;i m&atilde;i ta l&agrave; của nhau</div>\n<div class=\"ujudUb\">Mai n&agrave;y em xấu đi th&igrave; anh c&oacute; c&ograve;n y&ecirc;u em như l&uacute;c đầu?<br>Khẽ mỉm cười anh n&oacute;i: \"Em thật ngốc nghếch\"<br>\"Anh y&ecirc;u em đến khi nhắm mắt xu&ocirc;i tay\"</div>\n<div class=\"ujudUb\">Th&ocirc;i th&igrave; em giấu cho ri&ecirc;ng anh<br>Ng&ocirc;i nh&agrave; trong tr&aacute;i tim em<br>L&uacute;c giận hờn tr&aacute;ch m&oacute;c, lo sợ mất nhau<br>Xin h&atilde;y tựa v&agrave;o vai nhau</div>",
    "section": "4G",
    "bar": "23",
    "bpm": "345",
    "mic": "HUYNH",
    "mp4": "00:04:03",
    "costume": "H",
    "small_props": "MIC",
    "id": 5
  },
  {
    "name": "Yêu là cưới",
    "artist_id": "2",
    "time": "00:03:08",
    "lyrics": "<p>Đếm bao ng&agrave;y xu&acirc;n đi qua<br>Xin ph&eacute;p gia đ&igrave;nh Mẹ Cha<br>Cho rước em về l&agrave;m d&acirc;u 2 đứa sau n&agrave;y l&agrave;m gi&agrave;u<br>K&eacute;o theo đ&agrave;n trai bưng m&acirc;m<br>Coi b&oacute;i ngay ng&agrave;y 25<br>N&agrave;ng ơi anh tới anh đ&oacute;n em về kết t&igrave;nh trăm năm</p>\n<p>Đ&ecirc;m nằm mơ ng&agrave;y l&agrave;m thơ<br>Thương rồi nhớ m&agrave; cớ sao l&ograve;ng thẫn thờ<br>Y&ecirc;u l&agrave; cưới tr&ecirc;n dưới hai nh&agrave; l&agrave;m sui<br>Rượu bia chơi l&aacute;ng 9 th&aacute;ng 10 ng&agrave;y c&oacute; cục cưng nu&ocirc;i</p>\n<p>T&igrave;nh mặn nồng..y&ecirc;u đậm s&acirc;u&hellip;c&oacute; đứt tơ hồng th&igrave; cũng kh&ocirc;ng l&agrave;m cho ta xa c&aacute;ch nhau<br>Em trồng rau..anh cắm c&acirc;u&hellip;t&iacute;nh to&aacute;n trong đầu&hellip;nhất quyết đ&oacute;n em về l&agrave;m d&acirc;u</p>\n<p>D&agrave;n nhạc xập x&igrave;nh xập x&igrave;nh&hellip;kh&ocirc;ng kh&iacute; t&acirc;n h&ocirc;n linh đ&igrave;nh<br>Ai cũng x&igrave; xầm đ&ocirc;i m&igrave;nh&hellip;nh&igrave;n tụi n&oacute; t&igrave;nh bể b&igrave;nh<br>Nhậu s&aacute;ng đ&ecirc;m&hellip;rượu 5 l&iacute;t bia 5 chục lon<br>Động ph&ograve;ng &acirc;n &aacute;i&hellip;lo cuốc lo c&agrave;y kiếm tiền nu&ocirc;i con</p>\n<p>2 nh&agrave; ta&hellip;nay th&agrave;nh sui&hellip;th&ecirc;m thằng cu hay c&ocirc; c&ocirc;ng ch&uacute;a lại c&agrave;ng vui<br>Lo mần ăn&hellip;kh&ocirc;ng l&agrave; ti&ecirc;u&hellip;.anh em ch&iacute; cốt đừng rủ chơi bời tui c&ograve;n vợ y&ecirc;u</p>\n<p>Y&ecirc;u thương nhau từ l&acirc;u m&agrave; anh chỉ muốn y&ecirc;u lại từ đầu<br>Y&ecirc;u em khi c&ograve;n thơ y&ecirc;u cho đến khi răng long bạc đầu<br>Em ơi em đừng lo kề b&ecirc;n em lu&ocirc;n lu&ocirc;n c&oacute; anh<br>Thề một c&acirc;u lu&ocirc;n khi anh y&ecirc;u l&agrave; cưới.</p>",
    "section": "6N",
    "bar": "432",
    "bpm": "321",
    "mic": "THẮNG",
    "mp4": "00:03:08",
    "costume": "P",
    "small_props": "CHUÔNG",
    "id": 6
  },
  {
    "name": "Đơn giản anh yêu em",
    "artist_id": "3",
    "time": "\n      05:28",
    "section": "4H",
    "bar": "3",
    "bpm": "213",
    "mic": "H/22",
    "mp4": "  38:50",
    "costume": "JZ",
    "small_props": "CHUÔNG",
    "id": 7
  },
  {
    "name": "Hãy trao cho anh",
    "artist_id": "4",
    "time": "00:04:03",
    "lyrics": "<div class=\"ujudUb\">H&igrave;nh b&oacute;ng ai đ&oacute; nhẹ nh&agrave;ng vụt qua nơi đ&acirc;y<br>Quyến rũ ng&acirc;y ngất loạn nhịp l&agrave;m tim m&ecirc; say<br>Cuốn lấy &aacute;ng m&acirc;y theo cơn s&oacute;ng x&ocirc; dập d&igrave;u<br>Nụ cười ngọt ng&agrave;o cho ta tan v&agrave;o ph&uacute;t gi&acirc;y mi&ecirc;n man qu&ecirc;n hết con đường về eh</div>\n<div class=\"ujudUb\">Let me know your name<br>Chẳng thể t&igrave;m thấy lối về eh<br>Let me know your name<br>Điệu nhạc h&ograve;a quyện trong &aacute;nh mắt đ&ocirc;i m&ocirc;i</div>\n<div class=\"ujudUb\">Dẫn lối những bối rối rung động khẽ l&ecirc;n ng&ocirc;i<br>V&agrave; rồi khẽ v&agrave; rồi khẽ khẽ<br>Chạm nhau mang v&ocirc; v&agrave;n đắm đuối vấn vương d&acirc;ng tr&agrave;n<br>Lấp k&iacute;n chốn nh&acirc;n gian l&agrave;n gi&oacute; ho&aacute; sắc hương mơ m&agrave;ng<br>Một gi&acirc;y ngang qua đời cất tiếng n&oacute;i kh&ocirc;ng n&ecirc;n lời<br>Ấm &aacute;p đến trao tay ng&agrave;n sao trời th&ecirc;m chơi vơi</div>\n<div class=\"ujudUb\">Dịu &ecirc;m kh&ocirc;ng gian bừng s&aacute;ng đ&aacute;nh thức mu&ocirc;n hoa mừng<br>Quấn qu&iacute;t h&aacute;t ng&acirc;n nga từng ch&uacute;t n&iacute;u bước ch&acirc;n em dừng<br>Bao &yacute; thơ tương tư ngẩn ngơ (la la la)<br>Lưu dấu nơi m&ecirc; cung đẹp thẫn thờ<br>Oh oh oh oh uh</div>\n<div class=\"ujudUb\">H&atilde;y trao cho anh h&atilde;y trao cho anh<br>H&atilde;y trao cho anh thứ anh đang mong chờ (oh oh oh oh)<br>H&atilde;y trao cho anh h&atilde;y trao cho anh<br>H&atilde;y mau l&agrave;m điều ta muốn v&agrave;o khoảnh khắc n&agrave;y đ&ecirc; (oh oh oh oh)</div>\n<div class=\"ujudUb\">H&atilde;y trao cho anh đ&ecirc; h&atilde;y trao cho anh đ&ecirc;<br>H&atilde;y trao anh trao cho anh đi những y&ecirc;u thương nồng ch&aacute;y (chỉ m&igrave;nh anh th&ocirc;i)<br>Trao anh &aacute;i &acirc;n nguy&ecirc;n vẹn đong đầy</div>\n<div class=\"ujudUb\">Lala lala<br>Lala lala<br>Lala lala<br>Lala lala</div>\n<div class=\"ujudUb\">Looking at my Gucci is about that time<br>We can smoke a blunt and pop a bottle of wine<br>Now get yourself together and be ready by nine<br>Cuz we gon' do some things that will shatter your spine</div>\n<div class=\"ujudUb\">Come one undone Snoop Dogg Son Tung<br>Long Beach is the city that I come from<br>So if you want some get some<br>Better enough take some take some</div>\n<div class=\"ujudUb\">Chạm nhau mang v&ocirc; v&agrave;n đắm đuối vấn vương d&acirc;ng tr&agrave;n<br>Lấp k&iacute;n chốn nh&acirc;n gian l&agrave;n gi&oacute; h&oacute;a sắc hương mơ m&agrave;ng<br>Một gi&acirc;y ngang qua đời cất tiếng n&oacute;i kh&ocirc;ng n&ecirc;n lời<br>Ấm &aacute;p đến trao tay ng&agrave;n sao trời l&ograve;ng c&agrave;ng th&ecirc;m chơi vơi</div>\n<div class=\"ujudUb\">Dịu &ecirc;m kh&ocirc;ng gian bừng s&aacute;ng đ&aacute;nh thức mu&ocirc;n hoa mừng<br>Quấn qu&iacute;t h&aacute;t ng&acirc;n nga từng ch&uacute;t n&iacute;u bước ch&acirc;n em dừng<br>Bao &yacute; thơ tương tư ngẩn ngơ (la la la)<br>Lưu dấu nơi m&ecirc; cung đẹp thẫn thờ<br>Oh oh oh oh uh</div>\n<div class=\"ujudUb\">H&atilde;y trao cho anh h&atilde;y trao cho anh<br>H&atilde;y trao cho anh thứ anh đang mong chờ (oh oh oh oh)<br>H&atilde;y trao cho anh h&atilde;y trao cho anh<br>H&atilde;y mau l&agrave;m điều ta muốn v&agrave;o khoảnh khắc n&agrave;y đ&ecirc; (oh oh oh oh)</div>\n<div class=\"ujudUb\">H&atilde;y trao cho anh đ&ecirc; h&atilde;y trao cho anh đ&ecirc;<br>H&atilde;y trao anh trao cho anh đi những y&ecirc;u thương nồng ch&aacute;y (chỉ m&igrave;nh anh th&ocirc;i)<br>Trao anh &aacute;i &acirc;n nguy&ecirc;n vẹn đong đầy</div>\n<div class=\"ujudUb\">Lala lala<br>Lala lala<br>Lala lala<br>Lala lala</div>\n<div class=\"ujudUb\">L&agrave;m cho ta ngắm th&ecirc;m n&agrave;ng vội v&agrave;ng qua chốc l&aacute;t<br>Như thanh &acirc;m chứa bao lời gọi mời trong kh&uacute;c h&aacute;t<br>Li&ecirc;u xi&ecirc;u ta xuyến xao rạo rực kh&aacute;t khao tr&ocirc;ng mong<br>Dịu d&agrave;ng lại gần nhau hơn dang tay &ocirc;m em v&agrave;o l&ograve;ng</div>\n<div class=\"ujudUb\">Th&ocirc;i trao đi trao hết đi đừng ngập ngừng che dấu nữa<br>Qu&ecirc;n đi qu&ecirc;n hết đi ngại ng&ugrave;ng lại gần th&ecirc;m ch&uacute;t nữa<br>Ch&igrave;m đắm giữa khung trời ri&ecirc;ng hai ta như dần h&ograve;a quyện<br>Mắt nhắm mắt tay đan tay hồn lạc về miền trăng sao</div>\n<div class=\"ujudUb\">Bu&ocirc;ng lơi cho ta ngắm th&ecirc;m n&agrave;ng vội v&agrave;ng qua chốc l&aacute;t<br>Như thanh &acirc;m chứa bao lời gọi mời trong kh&uacute;c h&aacute;t<br>Li&ecirc;u xi&ecirc;u ta xuyến xao rạo rực kh&aacute;t khao tr&ocirc;ng mong<br>Dịu d&agrave;ng lại gần nhau hơn dang tay &ocirc;m em v&agrave;o l&ograve;ng</div>\n<div class=\"ujudUb\">Trao đi trao hết đi đừng ngập ngừng che dấu nữa<br>Qu&ecirc;n đi qu&ecirc;n hết đi ngại ng&ugrave;ng lại gần th&ecirc;m ch&uacute;t nữa<br>Ch&igrave;m đắm giữa khung trời ri&ecirc;ng hai ta như dần h&ograve;a quyện<br>Mắt nhắm mắt tay đan tay hồn lạc về miền trăng sao</div>",
    "section": "8H",
    "bar": "32",
    "bpm": "5443",
    "mic": "huynh",
    "mp4": "00:04:03",
    "costume": "GH",
    "small_props": "CÀNH",
    "id": 8
  }
]
const EidtSong = (props: Props) => {
  const navigate = useNavigate();
  const { name, id, name_song, id_song } = useParams();

  const [valueText, setValueText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  // const dataSong = useAppSelector((data: any) => data.songs.value);
  const dataEdit = dataSong?.find((item: any) => item.id == id_song);

  // useEffect(() => {
  //   dispatch(getSong());
  // }, []);
  const onFinish = (values: any) => {
    const time = new Date(values.time._d);
    const timeMp4 = new Date(values.mp4._d);
    const editData: any = {
      name: values.name == undefined ? dataEdit?.name : values.name,
      time:
        values.time == undefined
          ? dataEdit?.time
          : `
      ${String(time.getHours()).length == 1 && 0}${time.getHours()}:${
              String(time.getMinutes()).length == 1 ? 0 : ""
            }${time.getMinutes()}:${
              String(time.getMilliseconds()).length == 1 && 0
            }${time.getSeconds()}`,
      lyrics: String(valueText).length == 0 ? dataEdit?.lyrics : valueText,
      section: values.section == undefined ? dataEdit?.section : values.section,
      bar: values.bar == undefined ? dataEdit?.bar : values.bar,
      bpm: values.bpm == undefined ? dataEdit?.bpm : values.bpm,
      mic: values.mic == undefined ? dataEdit?.mic : values.mic,
      mp4:
        values.mp4 == undefined
          ? dataEdit?.mp4
          : `${
              String(timeMp4.getHours()).length == 1 && 0
            }${timeMp4.getHours()}:${
              String(timeMp4.getMinutes()).length == 1 && 0
            }${timeMp4.getMinutes()}:${
              String(timeMp4.getMilliseconds()).length == 1 && 0
            }${timeMp4.getSeconds()}`,
      costume: values.costume == undefined ? dataEdit?.costume : values.costume,
      small_props:
        values.small_props == undefined
          ? dataEdit?.small_props
          : values.small_props,
    };

    dispatch(uploadSong({ id: id_song, data: editData }));
    navigate(`/artist&&name=${name}&&id=${id}/songs`);
    message.success("Edit successful");
  };
  return (
    <div>
      <div
        style={{
          paddingBottom: 10,
          borderBottom: "1px solid rgb(228, 228, 228) ",
          marginBottom: 10,
        }}
      >
        <h3 style={{ color: "#fff", marginTop: "20px" }}>Edit Song</h3>
      </div>
      {dataEdit !== undefined && (
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 24]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Name song"
                name="name"
                labelAlign="left"
                style={{ padding: "0 0 20px 0" }}
                className="gutter-row"
              >
                <Input defaultValue={dataEdit.name} placeholder="Name song" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Time "
                labelAlign="left"
                style={{ padding: "0 0 20px 0" }}
                className="gutter-row"
                name="time"
              >
                <TimePicker
                  defaultValue={moment(`${dataEdit.time}`, "HH:mm:ss")}
                  defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Section"
                labelAlign="left"
                style={{ padding: "0 0 20px 0" }}
                className="gutter-row"
                name="section"
              >
                <Input defaultValue={dataEdit.section} placeholder="Section" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Bar"
                labelAlign="left"
                style={{ padding: "0 0 20px 0" }}
                className="gutter-row"
                name="bar"
              >
                <Input defaultValue={dataEdit.bar} placeholder="Quán hát" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Bpm"
                name="bpm"
                labelAlign="left"
                style={{ padding: "0 0 20px 0" }}
                className="gutter-row"
              >
                <Input defaultValue={dataEdit.bpm} placeholder="Bpm" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="♪４"
                name="mp4"
                labelAlign="left"
                style={{ padding: "0 0 20px 0" }}
                className="gutter-row"
              >
                <TimePicker
                  defaultValue={moment(`${dataEdit.mp4}`, "HH:mm:ss")}
                  defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Costume"
                name="costume"
                labelAlign="left"
                style={{ padding: "0 0 20px 0" }}
                className="gutter-row"
              >
                <Input defaultValue={dataEdit.costume} placeholder="Costume" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="MIC"
                name="mic"
                labelAlign="left"
                style={{ padding: "0 0 20px 0" }}
                className="gutter-row"
              >
                <Input defaultValue={dataEdit.mic} placeholder="Mic" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Small props"
                name="small_props"
                labelAlign="left"
                style={{ padding: "0 0 20px 0" }}
                className="gutter-row"
              >
                <Input
                  defaultValue={dataEdit.small_props}
                  placeholder="Small props"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Lyrics" labelAlign="left" name="lyrics">
            <Editor
              apiKey="f5r9v2m5jorsgp469noiiqpd10fc7xhmn3th5897ghxcpank"
              onEditorChange={(newText: any) => setValueText(newText)}
              // value={valueText}
              initialValue={valueText == "" ? dataEdit.lyrics : valueText}
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px ;background-color:black;color:#fff}",
              }}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 18,
            }}
          >
            <Button type="primary" htmlType="submit">
              Sửa
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};
export default EidtSong;
