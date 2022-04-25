import { Block, Router } from '../../core';
import '../../styles/profile.css';
import { withStore, withRouter } from '../../utils';
import { checkValidation, changePassword } from '../../services';
import {IFormField} from '../../interfaces';

type ChangePasswordPageProps = {
  router: Router;
  isLoading: boolean;
  isAuth: boolean;
  events: Record<string, (e: Event) => void>;
}

class ChangePasswordPage extends Block<ChangePasswordPageProps> {
  static componentName = 'ChangePasswordPage';

  constructor(props: ChangePasswordPageProps) {
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

            changePassword(result);
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

  protected getStateFromProps() {
    this.state = {
      inputs: {
        oldPassword: {
          label: 'Старый пароль',
          ref: 'oldPassword',
          name: 'oldPassword',
          type: 'password',
          value: '',
          error: ''
        },
        newPassword: {
          label: 'Новый пароль',
          ref: 'newPassword',
          name: 'newPassword',
          type: 'password',
          value: '',
          error: ''
        }
      }
    }
  }

  render () {
    // language=hbs

    return `
        {{#Layout name="ChangePasswordPage" isLoading=isLoading}}
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
  isAuth: state.isAuth
});

export default withRouter(withStore(ChangePasswordPage, mapStateToProps));
