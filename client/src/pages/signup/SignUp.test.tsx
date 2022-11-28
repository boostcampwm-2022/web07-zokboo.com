import { fireEvent, render, screen } from '@testing-library/react';
import {
  CORRECT_CERTIFIED_NUMBER,
  CORRECT_EMAIL,
  CORRECT_ID,
  CORRECT_PW,
  WRONG_EMAIL,
  WRONG_ID,
  WRONG_PW,
} from './constants';
import SignUp from './SignUp';

// jest.mock('react-router-dom', () => {
//   return {
//     Redirect: jest.fn(({ to }) => `Redirected to ${to}`),
//   };
// });

describe('아이디 입력 테스트', () => {
  test('잘못된 값 입력 시 안내문 생성', () => {
    // render 방식은 두가지.

    // 1. 모든 method를 받는 방식
    render(<SignUp />);

    // 2. 한정된 method만 받는 방식
    // const {getByText} = render(<SignUp/>);

    /**
     * id input 박스를 가져오는 방법은 여러개가 있다.
     */

    /**
     * 요소를 가져오는 방법은 오로지 사용자 화면 기준에 보이는 것들 기준으로 가져올 수 있다.
     *     ex) placeholder는 화면에 보이기때문에 가져올 수 있다.
     *     ex) input tag 내 name 속성은 보이지 않기 때문에 가져올 수 없다. (추가) querySelector 이용하면 뭐든 가져올 수 있긴 하다.
     */

    // findBy~~ : element가 있던없던 Promise반환
    // getBy~~ : element가 있으면 element 반환
    // queryBy~~ 문법도 있다 : (element가 있으면) element 반환 / (없으면) null 반환

    // 요소의 선언
    // const idInputElement = await screen.findByPlaceholderText('영문 소문자, 숫자 조합 6-16자');
    const idInputElement = screen.getByPlaceholderText('영문 소문자, 숫자 조합 6-16자');

    fireEvent.change(idInputElement, { target: { value: WRONG_ID } });

    // expect(await screen.findByText(/아이디는 영문 소문자, 숫자 조합 6-16자 여야합니다./i)).toBeInTheDocument();
    // expect(screen.getByText(/아이디는 영문 소문자, 숫자 조합 6-16자 여야합니다./i)).toBeInTheDocument();
    expect(screen.queryByText(/아이디는 영문 소문자, 숫자 조합 6-16자 여야합니다./i)).not.toBeNull(); // 부정형을 검사할 경우 중간애 not 을 껴준다.
  });

  test('옳바른 값 입력 시 안내문 생성 안됨', async () => {
    render(<SignUp />);

    const idInputElement = screen.getByPlaceholderText('영문 소문자, 숫자 조합 6-16자');

    fireEvent.change(idInputElement, { target: { value: CORRECT_ID } });

    // 이 경우 안내문이 없는게 정상이므로 해당 element가 없을때 null을 반환하는 queryBy를 사용.
    expect(screen.queryByText(/아이디는 영문 소문자, 숫자 조합 6-16자 여야합니다./i)).toBeNull();
  });
});

describe('비밀번호 입력 테스트', () => {
  test('잘못된 값 입력 테스트', () => {
    const a = render(<SignUp />);

    const pwInputElement = screen.getByPlaceholderText('영문, 숫자, 특수기호 조합 8-16자');

    fireEvent.change(pwInputElement, { target: { value: WRONG_PW } });

    expect(screen.queryByText(/비밀번호는 영문,숫자,특수기호 조합 8-16자 여야합니다./i)).not.toBeNull();
  });

  test('옳바른 값 입력 테스트', () => {
    render(<SignUp />);
    const pwInputElement = screen.getByPlaceholderText('영문, 숫자, 특수기호 조합 8-16자');

    fireEvent.change(pwInputElement, { target: { value: CORRECT_PW } });
    expect(screen.queryByText(/비밀번호는 영문,숫자,특수기호 조합 8-16자 여야합니다./i)).toBeNull();
  });

  test('비밀번호 숨김처리 테스트', () => {
    // querySelector를 이용할 경우 이런식으로 render를 한다.
    const { container } = render(<SignUp />);
    const pwToggleVisibleElement = container.querySelector('.pwToggleVisible');

    // if문을 걸어주지 않으면 ts에러 생김 https://github.com/testing-library/react-testing-library/issues/119
    if (pwToggleVisibleElement) {
      fireEvent.click(pwToggleVisibleElement);
    }

    expect(screen.getByPlaceholderText('영문, 숫자, 특수기호 조합 8-16자')).toHaveAttribute('type', 'text');
  });
});

describe('이메일 입력 테스트', () => {
  test('옳바른 값 입력 시 [인증번호 전송]버튼 활성화, 클릭 시 인증번호 창 생성, 인증번호 입력', () => {
    render(<SignUp />);
    const emailInputElement = screen.getByPlaceholderText('이메일');
    fireEvent.change(emailInputElement, { target: { value: CORRECT_EMAIL } });

    expect(screen.getByText('인증번호 전송')).not.toBeDisabled();

    const CertifiedNumberSendElement = screen.getByText('인증번호 전송');
    fireEvent.click(CertifiedNumberSendElement);
    expect(screen.getByText('인증번호')).not.toBeNull();

    const CertifiedNumberInputElement = screen.getByPlaceholderText('인증번호');
    fireEvent.change(CertifiedNumberInputElement, { target: { value: CORRECT_CERTIFIED_NUMBER } });

    // 이런식으로 element의 data-testid 속성을 통해 불러올 수도 있다.
    // 물론 querySelector로 className을 통해 불러올 수도 있다.
    fireEvent.click(screen.getByTestId('certifiedNumberCheck'));
    expect(global.alert).toBeDefined();
  });

  test('잘못된 값 입력 시 [인증번호 전송]버튼 비활성화', () => {
    render(<SignUp />);
    const emailInputElement = screen.getByPlaceholderText('이메일');
    fireEvent.change(emailInputElement, { target: { value: WRONG_EMAIL } });
    expect(screen.getByText('인증번호 전송')).toBeDisabled();
  });
});

describe('회원가입 전체 과정 테스트', () => {
  test('', () => {
    render(<SignUp />);
    const idInputElement = screen.getByPlaceholderText('영문 소문자, 숫자 조합 6-16자');
    fireEvent.change(idInputElement, { target: { value: CORRECT_ID } });

    const pwInputElement = screen.getByPlaceholderText('영문, 숫자, 특수기호 조합 8-16자');
    fireEvent.change(pwInputElement, { target: { value: CORRECT_PW } });

    const pwCheckInputElement = screen.getByPlaceholderText('비밀번호 재입력');
    fireEvent.change(pwCheckInputElement, { target: { value: CORRECT_PW } });

    const emailInputElement = screen.getByPlaceholderText('이메일');
    fireEvent.change(emailInputElement, { target: { value: CORRECT_EMAIL } });

    const CertifiedNumberSendElement = screen.getByText('인증번호 전송');
    fireEvent.click(CertifiedNumberSendElement);

    const CertifiedNumberInputElement = screen.getByPlaceholderText('인증번호');
    fireEvent.change(CertifiedNumberInputElement, { target: { value: CORRECT_CERTIFIED_NUMBER } });

    fireEvent.click(screen.getByTestId('certifiedNumberCheck'));

    // 보통 testId를 달아주기 보다는 id를 달아준 후 getElementById로 가져온다.
    const signupButtonElement = screen.getByTestId('signup');
    expect(signupButtonElement).not.toBeDisabled();
  });
});

// 커스텀 훅 테스트도 할수있다.
