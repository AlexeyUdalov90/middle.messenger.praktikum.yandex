import Block from './Block';

export default function renderDOM(query: string, BlockPage: Block<unknown>) {
  const root = document.querySelector(query);

  if (root) {
    root.innerHTML = '';
    root.appendChild(BlockPage.getContent());
  }
}
