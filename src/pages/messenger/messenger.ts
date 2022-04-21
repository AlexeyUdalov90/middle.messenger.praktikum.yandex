import {Block, Router} from '../../core';
import '../../styles/messenger.css';
import { withRouter, withStore } from '../../utils';

type MessengerPageProps = {
  router: Router;
  isLoading: boolean;
  isAuth: boolean;
};

class MessengerPage extends Block<MessengerPageProps> {
  static componentName = 'MessengerPage';

  constructor(props: MessengerPageProps) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.isAuth) {
      this.props.router.go('/')
    }
  }

  protected getStateFromProps() {
    this.state = {
      searchValue: '',
      conversations: [
        {
          isActive: false,
          userName: 'Андрей',
          message: {
            text: 'Изображение',
            isPersonal: false
          },
          date: '10:49',
          newMessages: 2
        },
        {
          isActive: true,
          userName: 'Киноклуб',
          message: {
            text: 'стикер',
            isPersonal: true
          },
          date: '12:00',
          newMessages: 0
        },
        {
          isActive: false,
          userName: 'Илья',
          message: {
            text: 'Друзья, у меня для вас особенный выпуск новостей!...',
            isPersonal: false
          },
          date: '24 Апр. 2020',
          newMessages: 4
        }
      ],
      chatData: {
        userName: 'Вадим',
        messages: [
          {
            text: 'Круто!',
            time: '12:00',
            isMy: true
          }, {
            text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
            time: '11:56',
            isMy: false
          }
        ]
      },
      onSearchHandler: (e: Event): void => {
        e.preventDefault();

        const searchInput = this.refs.search.querySelector<HTMLInputElement>('input');

        if (searchInput) {
          console.log({
            search: searchInput.value
          })
        }
      }
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
                            {{{Link className="messenger-panel__profile" to="/profile" text="Профиль >"}}}
                            {{{SearchForm
                                ref="search"
                                value=searchValue
                                onSubmit=onSearchHandler
                            }}}
                        </div>
                        <div class="messenger-panel__conversations">
                            {{#each conversations}}
                                {{{Conversation
                                    className="messenger-panel__conversations-item"
                                    isActive=isActive
                                    userName=userName
                                    message=message
                                    date=date
                                    newMessages=newMessages
                                }}}
                            {{/each}}
                        </div>
                    </div>
                </div>
                <div class="messenger__right">
                    {{{Chat data=chatData}}}
                </div>
            </section>
        {{/Layout}}
    `;
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.isLoading,
  isAuth: state.isAuth
});

export default withRouter(withStore(MessengerPage, mapStateToProps));
