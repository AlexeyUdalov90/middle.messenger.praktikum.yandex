import { Block, Router } from '../../core';
import { withRouter } from '../../utils';

type LinkProps = {
  to: string;
  router: Router;
  className?: string;
  text?: string;
  events: Record<string, (e: Event) => void>
}

class Link extends Block<LinkProps> {
  static componentName = 'Link';

  constructor(props: LinkProps) {
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

export default withRouter(Link);
