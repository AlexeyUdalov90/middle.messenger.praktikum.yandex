import { Block, Router } from '../../core';
import '../../styles/profile.css';
import { withStore, withRouter } from '../../utils';
import { checkValidation, changePassword } from '../../services';
import {ChangePasswordDTO} from '../../api/types';

type ChangePasswordPageProps = {
  router: Router;
  isLoading: boolean;
  isAuth: boolean;
  user: User;
  events: Record<string, (e: Event) => void>;
};

class ChangePasswordPage extends Block<ChangePasswordPageProps> {
  static componentName = 'ChangePasswordPage';

  constructor(props: ChangePasswordPageProps) {
    super({
      ...props,
      events: {
        submit: (e) => {
          e.preventDefault();

          const newInputsState = Object.entries(this.refs).reduce((res: Record<string, unknown>, [name, item]) => {
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

          const isInvalid = Object.values(this.state.inputs).some(input => Boolean((input as Input).error));

          if (!isInvalid) {
            const result = Object.entries(this.state.inputs).reduce((submitRes: Record<string, unknown>, [key, data ]) => {
              submitRes[key] = (data as Input).value;

              return submitRes;
            }, {});

            changePassword(result as ChangePasswordDTO);
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
  isAuth: state.isAuth,
  user: state.user
});

export default withRouter(withStore(ChangePasswordPage, mapStateToProps));
