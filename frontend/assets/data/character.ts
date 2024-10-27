export type CharacterType = {
  number: number;
  name: string;
  image: string;
  description?: string;
  bookGif?: string;
  bonfireGif?: string;
};

export const characters: CharacterType[] = [
  {
    number: 1,
    name: 'テシウ',
    image: require('assets/images/テシウ.png'),
    description:
      '風に乗ってフワフワ漂うのが得意！わんぱくに見えるけど実はちょっとナイーブで、誰かがハンカチ代わりに使ってくれたらそれだけで満足。消えそうで消えないこの儚さが、ボクのチャームポイントなのだ。',
    bonfireGif: require('assets/images/bonfire/テシウ.gif'),
  },
  {
    number: 2,
    name: 'カンミナ',
    image: require('assets/images/カンミナ.png'),
    description:
      '何度も持ち主の手を渡り歩き、いろんな景色を見てきたから、どこに行ってもホームな気分。中身は空っぽだけど、ハートは常に満タン！誰かに拾ってもらえたら嬉しいけど、気ままに転がってるのも悪くない。',
    bonfireGif: require('assets/images/bonfire/カンミナ.gif'),
  },
  {
    number: 3,
    name: 'PT',
    image: require('assets/images/PT.png'),
    description:
      '中身がちょっとだけ残っているのがミステリアス。水の残りはオレの最後のプライドだから、誰にも触れられたくないんだ。ずっとこのままでいてもいいし、もし拾ってくれるなら…静かに持って行ってくれよ。',
    bonfireGif: require('assets/images/bonfire/PT.gif'),
  },
  {
    number: 4,
    name: 'ダンビー',
    image: require('assets/images/ダンビー.png'),
    description:
      '外の世界は広すぎて、ちょっと怖い。でも、一人でじっとしていると、誰か優しい人が見つけてくれるかもってちょっとだけ期待もしてる。隠れ家は居心地がいいから、そろそろ誰か呼びたいと思っている。',
    bookGif: require('assets/images/book/ダンビー.gif'),
    bonfireGif: require('assets/images/bonfire/ダンビー.gif'),
  },
  {
    number: 5,
    name: 'ビニりん',
    image: require('assets/images/ビニりん.png'),
    description:
      'ちょっと待って、ひとりにしないで…！この体は軽くて風にフワッと飛ばされそうで、誰かにしっかり持っていてほしい。君と一緒にいられたら、安心できるんだけど…',
    bonfireGif: require('assets/images/bonfire/ビニりん.gif'),
  },
  {
    number: 6,
    name: 'ビンボーイ',
    image: require('assets/images/ビンボーイ.png'),
    description: '何かを失くしたって、何も変わらないし、ここにいるのもそれなりに気に入ってる。',
    bonfireGif: require('assets/images/bonfire/ビンボーイ.gif'),
  },
  { number: 7, name: 'カンミナ', image: require('assets/images/unknown.png') },
  { number: 8, name: 'カンミナ', image: require('assets/images/unknown.png') },
  { number: 9, name: 'カンミナ', image: require('assets/images/unknown.png') },
  { number: 10, name: 'カンミナ', image: require('assets/images/unknown.png') },
  { number: 11, name: 'カンミナ', image: require('assets/images/unknown.png') },
  { number: 12, name: 'カンミナ', image: require('assets/images/unknown.png') },
  { number: 13, name: 'カンミナ', image: require('assets/images/unknown.png') },
  { number: 14, name: 'カンミナ', image: require('assets/images/unknown.png') },
  { number: 15, name: 'カンミナ', image: require('assets/images/unknown.png') },
  { number: 16, name: 'カンミナ', image: require('assets/images/unknown.png') },
];
