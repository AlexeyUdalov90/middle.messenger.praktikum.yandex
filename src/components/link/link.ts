import { Block, Router } from '../../core';

interface ILink {
  to: string;
  router: Router;
  className?: string;
  text?: string;
  events: Record<string, (e: Event) => void>
}

export class Link extends Block<ILink> {
  static componentName = 'Link';

  constructor(props: ILink) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          e.preventDefault();

          this.props.router.go(this.props.to);
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
