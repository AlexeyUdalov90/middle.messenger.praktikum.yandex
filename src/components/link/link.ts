import { Block, Router } from '../../core';

interface ILink {
  to: string;
  className?: string;
  text?: string;
}

export class Link extends Block {
  static componentName = 'Link';

  constructor(props: ILink) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          e.preventDefault();

          const router = new Router('#app');

          router.go(this.props.to);
        }
      }
    });
  }

  render () {
    // language=hbs
    return `
      <a class="link {{className}}" href="{{to}}">{{text}}</a>
    `
  }
}
