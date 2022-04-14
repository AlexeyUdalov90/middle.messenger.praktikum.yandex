import Block from './Block';

export default function renderDOM(query: string, BlockPage: Block<P>) {
  const root = document.querySelector(query);

  root!.appendChild(BlockPage.getContent());
}
