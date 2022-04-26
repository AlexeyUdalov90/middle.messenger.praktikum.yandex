import { Block } from '../../core';
import './avatar.css';
import { setAvatar } from '../../services';

type AvatarProps = {
  avatar: string;
  events: Record<string, (e: Event) => void>;
};

export class Avatar extends Block<AvatarProps> {
  static componentName = 'Avatar';

  constructor(props: AvatarProps) {
    super({
      ...props,
      events: {
        change: (e) => {
          const input = e.target as HTMLInputElement;
          const file = input.files && input.files[0] as File;

          this.setState({
            ...this.state,
            fileName: file?.name ?? '',
            file: file ?? null
          })
        },
        click: (e) => {
          const element = e.target as HTMLElement;

          if (element.classList.contains('js-avatar-button') && !this.state.isOpenModal) {
            this.setState({
              ...this.state,
              isOpenModal: true
            });

            return;
          }

          if (this.state.isOpenModal && !element.closest('.js-modal-content')) {
            this.setState({
              ...this.state,
              isOpenModal: false
            });

            return;
          }
        },
        submit: (e) => {
          e.preventDefault();

          if (this.state.file) {
            const formData = new FormData();

            formData.set('avatar', this.state.file)

            setAvatar(formData)
              .finally(() => {
                this.setState({
                  file: null,
                  fileName: '',
                  isOpenModal: false
                });
              })
          }
        }
      }
    });
  }

  protected getStateFromProps() {
    this.state = {
      file: null,
      fileName: '',
      isOpenModal: false
    }
  }

  render() {
    // language=hbs
    return `
      <div class="avatar">
          <button class="avatar__button js-avatar-button">
              {{#if avatar}}
                  <img src="https://ya-praktikum.tech/api/v2/{{avatar}}" alt="">
              {{/if}}
              <span class="avatar__text">Поменять<br>аватар</span>
          </button>
          <div class="modal {{#if isOpenModal}}modal_open{{/if}} avatar__modal">
            <div class="modal__content js-modal-content">
                <span class="modal__title">Загрузить аватар</span>
                <form class="form modal__form">
                    <label class="file-input modal__input">
                        <input type="file" name="avatar" accept="image/png, image/jpeg" hidden>
                        {{#if file}}
                            <span class="file-input__name">{{fileName}}</span>
                        {{else}}
                            <span class="file-input__label">Выбрать файл на компьютере</span>
                        {{/if}}
                    </label>
                    {{{Button type="submit" text="Поменять" className="modal__button"}}}
                </form>
            </div>
          </div>
      </div>
    `;
  }
}
