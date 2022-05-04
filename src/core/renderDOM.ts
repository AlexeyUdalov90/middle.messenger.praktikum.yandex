import Block from './Block';

export default function renderDOM(query: string, BlockPage: Block<any>) {
  const root = document.querySelector(query);

  root!.innerHTML = '';
  root!.appendChild(BlockPage.getContent());
}
