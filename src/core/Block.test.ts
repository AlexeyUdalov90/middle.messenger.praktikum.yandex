import Block from './Block';

type MockBlockProps = {
  user: Nullable<{
    name: string,
    surname: string
  }>
};

class MockBlock extends Block<MockBlockProps> {
  static componentName = 'MockBlock';

  constructor(props: MockBlockProps) {
    super({
      ...props
    });
  }

  protected getStateFromProps() {
    this.state = {
      userFullName: ''
    }
  }

  render () {
    // language=hbs

    return `
        {{#if user}}
            <div class="user-name">{{ user.name }}</div>
            <div class="user-surname">{{ user.surname }}</div>
        {{/if}}

        <div class="user-full-name">{{ userFullName }}</div>
    `;
  }
}

describe('core/Block', () => {
  const newProps: MockBlockProps = {
    user: {
      name: 'Name',
      surname: 'Surname'
    }
  };
  const newState: Record<string, unknown> = {
    userFullName: 'Name Surname'
  };

  it('block render', () => {
    const testingBlock = new MockBlock({ user: null });
    const mockFn = jest.fn();

    testingBlock.eventBus().on('flow:render', mockFn);

    testingBlock.init();

    expect(mockFn).toHaveBeenCalled();
  });

  it('set block props', () => {
    const testingBlock = new MockBlock({ user: null });
    const mockFn = jest.fn((oldTarget: Record<string, unknown>, target: Record<string, unknown>) => {
      expect(oldTarget).not.toEqual(newProps)
      expect(target).toEqual(newProps)
    });

    testingBlock.eventBus().on('flow:component-did-update', mockFn);

    testingBlock.setProps(newProps);

    expect(mockFn).toHaveBeenCalled();
  });

  it('set block state', () => {
    const testingBlock = new MockBlock({ user: null });
    const mockFn = jest.fn((oldTarget: Record<string, unknown>, target: Record<string, unknown>) => {
      expect(oldTarget).not.toEqual(newState)
      expect(target).toEqual(newState)
    });

    testingBlock.eventBus().on('flow:component-did-update', mockFn);

    testingBlock.setState(newState);

    expect(mockFn).toHaveBeenCalled();
  })
});
