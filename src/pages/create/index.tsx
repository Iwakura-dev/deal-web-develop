import {useRouter} from 'next/router';
import React, {useCallback, useEffect, useMemo} from 'react';
import {useForm} from 'react-hook-form';
import {useTronWebService} from '../../common/hooks';
import {Loader} from '../../components/common/Loader';
import {PageStatusesEnum} from '../../components/common/PageStatuses/pageStatuses.types';
import Status from '../../components/Status';
import {useI18n} from '../../i18n';
import {LoadingState, useCryptoStore} from '../../store/cryptoStore';
import styles from './styles.module.scss';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import {ButtonTypes} from '../../components/common/Button/button.types';

type CreateDealFormState = {
  makerAddress: string;
  takerAddress: string;
  arbiterAddress: string;
  amount: number;
  arbiterFeeInNormal: number;
  arbiterFeeInDispute: number;
  terms: string;
};

export default function CreateDeal() {
  const i18n = useI18n();
  const tronWebService = useTronWebService();
  const {createDealInfo, createDealInfoLoadingState, profile} =
    useCryptoStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = useForm<CreateDealFormState>({
    mode: 'onChange',
    // FIXME: Remove defaultValues
    // defaultValues: {
    //   takerAddress: 'TVj1tsUpDhL1hrJgK6KCbwF7JqAEKVDJYL',
    //   arbiterAddress: 'TPatpk6jhmptnQLoggHk3Eug2VcNabS5bs',
    //   amount: 1000,
    //   arbiterFeeInNormal: 10,
    //   arbiterFeeInDispute: 22,
    //   terms:
    //     'Участник "Б" покупает за полученную криптовалюту вещь и отправляет участнику "А" фото с чеком о покупке для подтвержд',
    // },
  });

  const [amount, arbiterFeeInNormal, arbiterFeeInDispute] = watch([
    'amount',
    'arbiterFeeInNormal',
    'arbiterFeeInDispute',
  ]);

  const totalAmount = useMemo(() => {
    if (amount && arbiterFeeInNormal && arbiterFeeInDispute) {
      return Number(amount) + Math.max(arbiterFeeInNormal, arbiterFeeInDispute);
    }
  }, [amount, arbiterFeeInNormal, arbiterFeeInDispute]);

  useEffect(() => {
    if (tronWebService) {
      const address = tronWebService.getDefaultAddress();
      setValue('makerAddress', address);
    }
  });

  const onSubmit = useCallback(
    async (data: CreateDealFormState) => {
      if (tronWebService && totalAmount) {
        await createDealInfo(
          {
            takerAddress: data.takerAddress,
            arbiterAddress: data.arbiterAddress,
            amount: data.amount,
            arbiterFeeInNormal: data.arbiterFeeInNormal,
            arbiterFeeInDispute: data.arbiterFeeInDispute,
            totalAmount,
            terms: data.terms,
          },
          tronWebService,
          () => {
            router.push(`/`);
          },
        );
      }
    },
    [tronWebService, totalAmount],
  );

  if (!profile.address) {
    return <Status status={PageStatusesEnum.connectWallet} />;
  }

  if (createDealInfoLoadingState === LoadingState.PENDING) return <Loader />;

  return (
    <div className={styles.container}>
      <h2>{i18n.t('create.title')}</h2>
      <form onSubmit={handleSubmit(data => onSubmit(data))}>
        <div className={styles.inputsBlock}>
          <div className={styles.row}>
            <Input
              label={i18n.t('create.makerAddress')}
              disabled
              error={errors.makerAddress?.message}
              {...register('makerAddress', {
                required: i18n.t('validation.required'),
              })}
            />
            <Input
              label={i18n.t('create.takerAddress')}
              error={errors.takerAddress?.message}
              {...register('takerAddress', {
                required: i18n.t('validation.required'),
              })}
            />
            <Input
              label={i18n.t('create.arbiterAddress')}
              error={errors.arbiterAddress?.message}
              {...register('arbiterAddress', {
                required: i18n.t('validation.required'),
              })}
            />
          </div>
          <div className={styles.row}>
            <Input
              label={i18n.t('create.amount')}
              placeholder={i18n.t('create.amountPlaceholder')}
              error={errors.amount?.message}
              {...register('amount', {required: i18n.t('validation.required')})}
            />
            <Input
              label={i18n.t('create.arbiterFeeInNormal')}
              placeholder={i18n.t('create.arbiterFeeInNormalPlaceholder')}
              error={errors.arbiterFeeInNormal?.message}
              {...register('arbiterFeeInNormal', {
                required: i18n.t('validation.required'),
              })}
            />
            <Input
              placeholder={i18n.t('create.arbiterFeeInDisputePlaceholder')}
              error={errors.arbiterFeeInDispute?.message}
              {...register('arbiterFeeInDispute', {
                required: i18n.t('validation.required'),
              })}
            />
          </div>
          <Input
            label={i18n.t('create.terms')}
            placeholder={i18n.t('create.termsPlaceholder')}
            error={errors.terms?.message}
            {...register('terms', {required: i18n.t('validation.required')})}
          />
        </div>
        <div className={styles.sumContainer}>
          <div className={styles.totalSumBlock}>
            <h4>{i18n.t('create.total')}</h4>
            <h5>{totalAmount && `${totalAmount} WEI`}</h5>
          </div>
          {/* TODO: Future */}
          {/*<div className={styles.totalSumBlock}>*/}
          {/*  <h4>Deal %:</h4>*/}
          {/*  <h5>123 WEI</h5>*/}
          {/*</div>*/}
          <p>{i18n.t('create.percent')}</p>
        </div>
        <div className={styles.buttonContainer}>
          <Button buttonColor={ButtonTypes.violet}>
            {i18n.t('create.button')}
          </Button>
        </div>
      </form>
    </div>
  );
}
