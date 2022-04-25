import { Block, Router } from '../../core';
import '../../styles/profile.css';
import { withStore, withRouter } from '../../utils';
import { checkValidation, changeProfile } from '../../services';
import { IFormField } from '../../interfaces';

type ChangeProfilePageProps = {
  router: Router;
  isLoading: boolean;
  isAuth: boolean;
  user: User;
  events: Record<string, (e: Event) => void>;
}

class ChangeProfilePage extends Block<ChangeProfilePageProps> {
  static componentName = 'ChangeProfilePage';

  constructor(props: ChangeProfilePageProps) {
    super({
      ...props,
      events: {
        submit: (e) => {
          e.preventDefault();

          const newInputsState = Object.entries(this.refs).reduce((res: any, [name, item]) => {
            const input = item.querySelector<HTMLInputElement>('input');

            if (input) {
              res[name] = {
                ...this.state.inputs[name],
                value: input.value,
                error: checkValidation(name, input.value)
              };
            }

            return res;
          }, {});

          this.setState({
            inputs: { ...newInputsState }
          });

          const isInvalid = Object.values(this.state.inputs).some(input => Boolean((input as IFormField).error));

          if (!isInvalid) {
            const result = Object.entries(this.state.inputs).reduce((submitRes: any, [key, data ]) => {
              submitRes[key] = (data as IFormField).value;

              return submitRes;
            }, {});

            changeProfile(result);
          }
        }
      }
    });
  }

  componentDidMount() {
    if (!this.props.isAuth) {
      this.props.router.go('/')
    }
  }

  protected getStateFromProps(props: ChangeProfilePageProps) {
    this.state = {
      inputs: {
        email: {
          label: 'Почта',
          ref: 'email',
          name: 'email',
          type: 'email',
          value: props.user.email,
          error: ''
        },
        login: {
          label: 'Логин',
          ref: 'login',
          name: 'login',
          type: 'text',
          value: props.user.login,
          error: ''
        },
        firstName: {
          label: 'Имя',
          ref: 'firstName',
          name: 'firstName',
          type: 'text',
          value: props.user.firstName,
          error: ''
        },
        secondName: {
          label: 'Фамилия',
          ref: 'secondName',
          name: 'secondName',
          type: 'text',
          value: props.user.secondName,
          error: ''
        },
        displayName: {
          label: 'Имя в чате',
          ref: 'displayName',
          name: 'displayName',
          type: 'text',
          value: props.user.displayName ? props.user.displayName : '',
          error: ''
        },
        phone: {
          label: 'Телефон',
          ref: 'phone',
          name: 'phone',
          type: 'tel',
          value: props.user.phone,
          error: ''
        }
      }
    }
  }

  render () {
    // language=hbs

    return `
        {{#Layout name="ChangeProfilePage" isLoading=isLoading}}
            <section class="section profile">
                <div class="left-bar profile__left">
                    {{{Link className="profile__back" to="/settings"}}}
                </div>
                <div class="profile__right">
                    <div class="profile__content">
                        <div class="profile__avatar profile__avatar_without-name">
                            {{{Avatar avatar=user.avatar}}}
                        </div>
                        <form class="form profile__form">
                            {{#each inputs}}
                                {{{FormField className="form__input" ref=ref label=label type=type name=name value=value error=error}}}
                            {{/each}}
                            {{{Button type="submit" text="Сохранить" className="form__button"}}}
                        </form>
                    </div>
                </div>
            </section>
        {{/Layout}}
    `;
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.isLoading,
  isAuth: state.isAuth,
  user: state.user
});

export default withRouter(withStore(ChangeProfilePage, mapStateToProps));
