import { Block, Router } from '../../core';
import '../../styles/messenger.css';
import { withRouter, withStore } from '../../utils';

type MessengerPageProps = {
  router: Router;
  isLoading: boolean;
  isAuth: boolean;
  chats: Nullable<Chats>;
  onSearchHandler: (e: Event) => void;
  onChooseChat: (id: number | string) => void;
};

class MessengerPage extends Block<MessengerPageProps> {
  static componentName = 'MessengerPage';

  constructor(props: MessengerPageProps) {
    super({
      ...props,
      onSearchHandler: (e) => {
        e.preventDefault();

        const searchInput = this.refs.search.querySelector<HTMLInputElement>('input');

        if (searchInput) {
          console.log({
            search: searchInput.value
          })
        }
      },
      onChooseChat: (id) => {
        const activeChat = this.props.chats?.find(chat => chat.id === id);

        if (activeChat) {
          this.setState({
            ...this.state,
            activeChat
          });
        }
      }
    });
  }

  componentDidMount() {
    if (!this.props.isAuth) {
      this.props.router.go('/')
    }
  }

  protected getStateFromProps() {
    this.state = {
      searchValue: '',
      activeChat: null
    };
  }

  render () {
    // language=hbs

    return `
        {{#Layout name="MessengerPage" isLoading=isLoading}}
            <section class="section messenger">
                <div class="left-bar messenger__left">
                    <div class="messenger__panel messenger-panel">
                        <div class="messenger-panel__top">
                            {{{Link className="messenger-panel__profile" to="/settings" text="Профиль >"}}}
                            <div class="messenger-panel__wrapper">
                                <div class="messenger-panel__search">
                                    {{{SearchForm
                                          ref="search"
                                          value=searchValue
                                          onSubmit=onSearchHandler
                                    }}}
                                </div>
                                {{{AddChat}}}
                            </div>
                        </div>
                        <div class="messenger-panel__conversations">
                            {{#if chats}}
                                {{#each chats}}
                                    {{{Conversation
                                        className="messenger-panel__conversations-item"
                                        data=this
                                        activeChatId=@root.activeChat.id
                                        onClick=@root.onChooseChat
                                    }}}
                                {{/each}}
                            {{/if}}
                        </div>
                    </div>
                </div>
                <div class="messenger__right">
                    {{#if activeChat}}
                        {{{Chat userId=userId chat=activeChat}}}
                    {{else}}
                        <p class="chat__empty-message">Выберите чат чтобы отправить сообщение</p>
                    {{/if}}
                </div>
            </section>
        {{/Layout}}
    `;
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.isLoading,
  isAuth: state.isAuth,
  userId: state.user?.id,
  chats: state.chats
});

export default withRouter(withStore(MessengerPage, mapStateToProps));
