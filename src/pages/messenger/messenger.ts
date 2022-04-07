import { Block } from '../../core';
import '../../styles/messenger.css';

export class MessengerPage extends Block {
  static componentName = 'MessengerPage';

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

        const searchInput = this.refs.search.querySelector('input') as HTMLInputElement;

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
      <section class="section messenger">
        <div class="left-bar messenger__left">
          <div class="messenger__panel messenger-panel">
            <div class="messenger-panel__top">
              <a class="messenger-panel__profile" href="./profile.html">Профиль ></a>
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
    `;
  }
}
