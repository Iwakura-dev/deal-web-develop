import _ from 'lodash';
import { useRouter } from 'next/router';

const i18nMessages: Record<string, any> = {
  'ru-RU': {
    common: {
      connectionError: 'Ошибка подключения, Попробуйте обновить страницу.',
      extensionError: 'Попробуйте обновить страницу.',
      deals: 'Сделки',
      connectWallet: 'Подключить кошелёк',
      connectWalletTitle: 'Подключение кошелька',
      createDeal: 'Создать сделку',
    },
    validation: {
      required: 'Обязательное поле',
      min: 'Не должно быть меньше 0.',
      max: 'Не должно быть больше <%= amount%>.',
    },
    create: {
      title: 'Создать новую сделку',
      makerAddress: 'Номер кошелька Мейкера',
      takerAddress: 'Номер кошелька Тейкера',
      arbiterAddress: 'Номер кошелька Гаранта',
      amount: 'Сумма сделки (WEI)',
      amountPlaceholder: 'Например, 12551',
      arbiterFeeInNormal: 'Сколько (WEI) от сделки получит гарант',
      arbiterFeeInNormalPlaceholder: 'Сделка успешна',
      arbiterFeeInDisputePlaceholder: 'Потребовался арбитраж',
      terms: 'Условия сделки',
      termsPlaceholder: 'Укажите условия сделки',
      total: 'Total sum:',
      percent:
        'Часть процента гаранта автоматически вернется на ваш Кошелёк, в случае, если сделка прошла успешна',
      button: 'Создать',
    },
    information: {
      title: 'Основная информация',
      dealDate: 'Дата сделки:',
      role: 'Ваша роль:',
      amount: 'Сумма:',
      taker: 'Тейкер:',
      arbitration: 'Arbitration (WEI):',
      maker: 'Мэйкер:',
      normal: 'Guarantor (WEI):',
      arbiter: 'Гарант:',
      terms: 'Условия:',
      approve: 'Принять участие в сделке?',
      approveButton: 'Подтвердить участие',
      cancel: 'Отменить сделку?',
      cancelButton: 'Отменить',
      confirm: 'Подтвердить сделку?',
      confirmButton: 'Подтвердить выполнение',
      toDispute: 'Оспорить сделку?',
      toDisputeButton: 'Оспорить',
      release: 'Перевести все деньги тейкеру?',
      releaseButton: 'Перевести деньги',
      amountToMaker: 'Вернется Мейкеру (WEI)',
      amountToTaker: 'Вернется Тейкеру (WEI)',
      result: 'Результаты оспаривания',
      resultAmountToMaker: 'Вернется Тейкеру:',
      resultAmountToTaker: 'Вернется Мейкеру:',
      button: 'Подтвердить',
    },
    dropdown: {
      wallet: 'Подключенный кошелёк',
      network: 'Сеть',
      disconnectWallet: 'Отключить кошелёк',
    },
    notification: {
      title: 'Уведомления',
    },
    role: {
      maker: 'Мэйкер',
      taker: 'Тэйкер',
      arbiter: 'Гарант',
    },
    dealState: {
      takerWaiting: 'Ожидает действий тэйкера',
      arbiterWaiting: 'Ожидает действий гаранта',
      inProgress: 'Обрабатывается',
      inReview: 'На проверке',
      inDispute: 'Оспаривается',
      done: 'Завершена',
      resolved: 'Решена',
      canceled: 'Отменена',
    },
    notificationMessage: {
      takerWaiting: 'Сделка создана',
      arbiterWaiting: 'Тэйкер подтвердил участие в сделке',
      inProgress: 'Гарант подтвердил участие в сделке',
      inReview: 'Сделка на проверке',
      inDispute: 'Сделка оспаривается',
      done: 'Сделка завершена',
      resolved: 'Диспут разрешен',
      canceled: 'Сделка отменена',
    },
    pageStatus: {
      noInternet: {
        topText: 'Потеряно интернет-соединение',
        bottomText:
          'Проверьте свое интернет-соединение и попробуйте перезагрузить страницу',
      },
      serverError: {
        topText: 'Ошибка сервера',
        bottomText: 'Попробуйте перезагрузить страницу',
      },
      somethingWrong: {
        topText: 'Что-то пошло не так',
        bottomText: 'Попробуйте перезагрузить страницу',
      },
      notFound: {
        topText: 'Страница не найдена',
        bottomText: '',
      },
      connectWallet: {
        topText: 'Подключите кошелёк',
        bottomText: 'Чтобы использовать функции сервиса',
        button: 'Подключить кошелёк',
      },
    },
    tableColumn: {
      dateTime: 'ДАТА, ВРЕМЯ (UTC)',
      id: 'ID',
      role: 'ВАША РОЛЬ',
      amount: 'СУММА (WEI)',
      status: 'СТАТУС',
    },
    modal: {
      confirmButton: 'Подтвердить',
      closeButton: 'Закрыть',
    },
  },
  'en-US': {
    common: {
      connectionError: 'Connection error, Try refreshing the page.',
      extensionError: 'Check the TronLink extension in your Chrome browser.',
      deals: 'Deals',
      connectWallet: 'Connect wallet',
      connectWalletTitle: 'Connect wallet',
      createDeal: 'Create a deal',
    },
    validation: {
      required: 'Обязательное поле',
      min: 'Should not be less than 0.',
      max: 'Should not be more than <%= amount%>.',
    },
    create: {
      title: 'Create a new deal',
      makerAddress: 'Maker’s wallet number',
      takerAddress: 'Taker’s wallet number',
      arbiterAddress: 'Guarantor wallet number',
      amount: 'Deal value (WEI)',
      amountPlaceholder: 'For example, 12551',
      arbiterFeeInNormal: 'How much (WEI) of the deal the guarantor gets',
      arbiterFeeInNormalPlaceholder: 'Deal is done',
      arbiterFeeInDisputePlaceholder: 'Deals is resolved',
      terms: 'Deal terms',
      termsPlaceholder: 'Write deal terms',
      total: 'Total sum:',
      percent:
        "Part of the guarantor's fee will automatically return to your wallet if the deal is successful",
      button: 'Create',
    },
    information: {
      title: 'Main info',
      dealDate: 'Deal date:',
      role: 'Your role:',
      amount: 'Total sum:',
      taker: 'Taker:',
      arbitration: 'Arbitration (WEI):',
      maker: 'Maker:',
      normal: 'Guarantor (WEI):',
      arbiter: 'Guarantor:',
      terms: 'Deal terms:',
      approve: 'Confirm the terms of the deal?',
      approveButton: 'Confirm deal terms',
      cancel: 'Cancel the deal?',
      cancelButton: 'Cancel',
      confirm: 'Confirm the deal?',
      confirmButton: 'Confirm completion',
      confirmParticipation: 'Confirm the deal?',
      confirmParticipationButton: 'Confirm participation',
      toDispute: 'Open a dispute over the deal?',
      toDisputeButton: 'Dispute',
      release: 'Transfer all money to tacker?',
      releaseButton: 'Transfer money',
      amountToMaker: 'For Maker (WEI)',
      amountToTaker: 'For Taker (WEI)',
      result: 'Dispute result',
      resultAmountToMaker: 'For Maker:',
      resultAmountToTaker: 'For Taker:',
      button: 'Confirm',
    },
    dropdown: {
      wallet: 'Connected wallet',
      network: 'Network',
      disconnectWallet: 'Disconnect wallet ',
    },
    notification: {
      title: 'Notifications',
    },
    role: {
      maker: 'Maker',
      taker: 'Taker',
      arbiter: 'Guarantor',
    },
    dealState: {
      takerWaiting: 'Waiting for Taker',
      arbiterWaiting: 'Waiting for Guarantor',
      inProgress: 'In progress',
      inReview: 'In review',
      inDispute: 'In dispute',
      done: 'Done',
      resolved: 'Resolved',
      canceled: 'Canceled',
    },
    notificationMessage: {
      takerWaiting: 'A deal has been created',
      arbiterWaiting: 'Taker has confirmed participation in the deal',
      inProgress: 'Guarantor has confirmed participation in the deal',
      inReview: 'Deal is being reviewed',
      inDispute: 'Deal is in dispute',
      done: 'Deal is done',
      resolved: 'Dispute is resolved',
      canceled: 'Deal is cancelled',
    },
    pageStatus: {
      noInternet: {
        topText: 'Lost internet connection',
        bottomText:
          'Check your internet connection and try refreshing the page.',
      },
      serverError: {
        topText: 'Server error',
        bottomText: 'Try refreshing the page.',
      },
      somethingWrong: {
        topText: 'Something went wrong',
        bottomText: 'Oops, something went wrong. Try refreshing the page.',
      },
      notFound: {
        topText: 'Page not found',
        bottomText: '',
      },
      connectWallet: {
        topText: 'Connect your wallet',
        bottomText: 'To use app features',
        button: 'Connect wallet',
      },
    },
    tableColumn: {
      dateTime: 'DATE, TIME (UTC)',
      id: 'ID',
      role: 'YOUR ROLE',
      amount: 'AMOUNT (WEI)',
      status: 'STATUS',
    },
    modal: {
      confirmButton: 'Confirm',
      closeButton: 'Close',
    },
  },
};

export const useI18n = () => {
  const { locale } = useRouter();
  const fallbackLocale = 'en-US';

  return {
    t: (key: string, options?: Record<string, string>) => {
      const messages = i18nMessages[locale ?? fallbackLocale];
      const message = _.get(messages, key);
      const template = _.template(message);
      return template(options);
    },
  };
};
