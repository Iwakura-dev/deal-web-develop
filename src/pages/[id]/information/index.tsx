import {useRouter} from 'next/router';
import React, {useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {
  amountFormatter,
  dateFromEpochFormatter,
  dealRoleFormatter,
  shortenStringFormatter,
} from '../../../common/formatters';
import {useEndlessRepeater, useTronWebService} from '../../../common/hooks';
import Button from '../../../components/common/Button';
import {ButtonTypes} from '../../../components/common/Button/button.types';
import {ConfirmModal} from '../../../components/common/ConfirmModal';
import DealStateInfo from '../../../components/common/DealStateInfo';
import Input from '../../../components/common/Input';
import {Loader} from '../../../components/common/Loader';
import {PageStatusesEnum} from '../../../components/common/PageStatuses/pageStatuses.types';
import Status from '../../../components/Status';
import {useI18n} from '../../../i18n';
import {LoadingState, useCryptoStore} from '../../../store/cryptoStore';
import {useUiStore} from '../../../store/uiStore';
import {ModalAction} from '../../../store/uiStore.types';
import {DealRole} from '../../../tron/model/dealRole';
import {DealState} from '../../../tron/model/dealState';
import styles from './styles.module.scss';

type ResolveDisputeFormState = {
  amountToTaker: number;
  amountToMaker: number;
};
export default function Information() {
  const router = useRouter();
  const i18n = useI18n();
  const id =
    router.query?.id && !Array.isArray(router.query?.id)
      ? Number(router.query?.id)
      : undefined;
  const tronWebService = useTronWebService();
  const isWalletConnected = useCryptoStore(state => !!state.profile.address);
  const {
    dealInfoLoadingState,
    dealInfo,
    fetchDealInfo,
    silentUpdateDealInfo,
    resetDealInfo,
    approveDealByTaker,
    approveDealByArbiter,
    cancelDeal,
    releaseDeal,
    toDisputeDeal,
    toReviewDeal,
  } = useCryptoStore();
  const {
    isConfirmModalOpen,
    confirmModalAction,
    confirmModalMessage,
    triggerConfirmModal,
    closeConfirmModal,
  } = useUiStore();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = useForm<ResolveDisputeFormState>({
    mode: 'onChange',
  });

  const amountToTaker = watch('amountToTaker');

  useEffect(() => {
    if (dealInfo?.amount && amountToTaker && amountToTaker <= dealInfo.amount) {
      setValue('amountToMaker', dealInfo.amount - amountToTaker);
    }
  }, [amountToTaker]);

  const initFetch = useCallback(async () => {
    if (tronWebService && isWalletConnected && id) {
      await fetchDealInfo({id}, tronWebService);
    }
  }, [tronWebService, isWalletConnected, id]);

  const endlessFetch = useCallback(async () => {
    if (tronWebService && isWalletConnected && id) {
      await silentUpdateDealInfo({id}, tronWebService);
    }
  }, [tronWebService, isWalletConnected, id]);

  useEndlessRepeater(3000, () => {
    void endlessFetch();
  });

  const onSubmitResolveDispute = useCallback(
    async (data: ResolveDisputeFormState) => {
      if (tronWebService && isWalletConnected && id) {
        await tronWebService.resolveDispute(Number(id), data.amountToTaker);
      }
    },
    [tronWebService, isWalletConnected, id],
  );

  const onModalConfirm = useCallback(async () => {
    if (confirmModalAction === ModalAction.VOID) return;
    if (tronWebService && isWalletConnected && id) {
      if (confirmModalAction === ModalAction.APPROVE_DEAL_BY_TAKER)
        await approveDealByTaker({id}, tronWebService);
      if (confirmModalAction === ModalAction.APPROVE_DEAL_BY_ARBITER)
        await approveDealByArbiter({id}, tronWebService);
      if (confirmModalAction === ModalAction.CANCEL_DEAL)
        await cancelDeal({id}, tronWebService);
      if (confirmModalAction === ModalAction.RELEASE_DEAL)
        await releaseDeal({id}, tronWebService);
      if (confirmModalAction === ModalAction.SEND_DEAL_TO_REVIEW)
        await toReviewDeal({id}, tronWebService);
      if (confirmModalAction === ModalAction.SEND_DEAL_TO_DISPUTE)
        await toDisputeDeal({id}, tronWebService);
    }
    await initFetch();
    closeConfirmModal();
  }, [tronWebService, isWalletConnected, id, confirmModalAction]);

  useEffect(() => {
    void initFetch();
    return () => resetDealInfo();
  }, [initFetch]);

  if (!isWalletConnected) {
    return <Status status={PageStatusesEnum.connectWallet} />;
  }

  if (dealInfoLoadingState === LoadingState.PENDING || !dealInfo)
    return <Loader />;

  if (dealInfoLoadingState === LoadingState.FAILED)
    return <Status status={PageStatusesEnum.serverError} />;

  if (!dealInfo?.id) return <Status status={PageStatusesEnum.notFound} />;

  const dealRoleKey =
    dealInfo.role !== undefined ? dealRoleFormatter(dealInfo.role) : undefined;

  const dealRole = dealRoleKey ? i18n.t(dealRoleKey) : undefined;

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h2>ID: {dealInfo.id}</h2>
        <div className={styles.status}>
          <DealStateInfo value={dealInfo.state} />
        </div>
      </div>
      <div className={styles.pageInformation}>
        <h2>{i18n.t('information.title')}</h2>
        <div className={styles.mainInformation}>
          <div className={styles.informationRow}>
            <h4>{i18n.t('information.dealDate')}</h4>
            <h5>{dateFromEpochFormatter(dealInfo.createdAt)}</h5>
          </div>

          <div className={styles.informationRow}>
            <h4>{i18n.t('information.role')}</h4>
            <h5>{dealRole ?? '-'}</h5>
          </div>

          <div className={styles.informationRow}>
            <h4>{i18n.t('information.amount')}</h4>
            <h5>{amountFormatter(dealInfo.amount)} WEI</h5>
          </div>

          <div className={styles.informationRow}>
            <h4>{i18n.t('information.taker')}</h4>
            <h5>{shortenStringFormatter(dealInfo.taker)}</h5>
          </div>

          <div className={styles.informationRow}>
            <h4>{i18n.t('information.arbitration')}</h4>
            <h5>{amountFormatter(dealInfo.feeInfo.arbiterFeeInDispute)} WEI</h5>
          </div>

          <div className={styles.informationRow}>
            <h4>{i18n.t('information.maker')}</h4>
            <h5>{shortenStringFormatter(dealInfo.maker)}</h5>
          </div>

          <div className={styles.informationRow}>
            <h4>{i18n.t('information.normal')}</h4>
            <h5>{amountFormatter(dealInfo.feeInfo.arbiterFeeInNormal)} WEI</h5>
          </div>

          <div className={styles.informationRow}>
            <h4>{i18n.t('information.arbiter')}</h4>
            <h5>{shortenStringFormatter(dealInfo.arbiter)}</h5>
          </div>
        </div>

        <div className={styles.conditions}>
          <h2>{i18n.t('information.terms')}</h2>
          <p>{dealInfo.terms}</p>
        </div>

        {/* TakerWaiting */}

        {(dealInfo.role === DealRole.Taker ||
          dealInfo.role === DealRole.Maker) &&
          dealInfo.state === DealState.TakerWaiting && (
            <div className={styles.approveParticipation}>
              {dealInfo.role === DealRole.Taker && (
                <div className={styles.leftBlock}>
                  <Button
                    buttonColor={ButtonTypes.violet}
                    onClick={() =>
                      triggerConfirmModal(
                        i18n.t('information.approve'),
                        ModalAction.APPROVE_DEAL_BY_TAKER,
                      )
                    }>
                    {i18n.t('information.approveButton')}
                  </Button>
                </div>
              )}
              <Button
                buttonColor={ButtonTypes.gray}
                onClick={() =>
                  triggerConfirmModal(
                    i18n.t('information.cancel'),
                    ModalAction.CANCEL_DEAL,
                  )
                }>
                {i18n.t('information.cancelButton')}
              </Button>
            </div>
          )}

        {/* ArbiterWaiting */}

        {dealInfo.role === DealRole.Arbiter &&
          dealInfo.state === DealState.ArbiterWaiting && (
            <div className={styles.approveParticipation}>
              <div className={styles.leftBlock}>
                <Button
                  buttonColor={ButtonTypes.violet}
                  onClick={() =>
                    triggerConfirmModal(
                      i18n.t('information.confirmParticipation'),
                      ModalAction.APPROVE_DEAL_BY_ARBITER,
                    )
                  }>
                  {i18n.t('information.confirmParticipationButton')}
                </Button>
              </div>
              <Button
                buttonColor={ButtonTypes.gray}
                onClick={() =>
                  triggerConfirmModal(
                    i18n.t('information.cancel'),
                    ModalAction.CANCEL_DEAL,
                  )
                }>
                {i18n.t('information.cancelButton')}
              </Button>
            </div>
          )}

        {/* InProgress */}

        {(dealInfo.role === DealRole.Taker ||
          dealInfo.role === DealRole.Maker) &&
          dealInfo.state === DealState.InProgress && (
            <div className={styles.approveParticipation}>
              <div className={styles.leftBlock}>
                {dealInfo.role === DealRole.Taker && (
                  <Button
                    buttonColor={ButtonTypes.violet}
                    onClick={() =>
                      triggerConfirmModal(
                        i18n.t('information.confirm'),
                        ModalAction.SEND_DEAL_TO_REVIEW,
                      )
                    }>
                    {i18n.t('information.confirmButton')}
                  </Button>
                )}
                {dealInfo.role === DealRole.Maker && (
                  <Button
                    buttonColor={ButtonTypes.light}
                    onClick={() =>
                      triggerConfirmModal(
                        i18n.t('information.toDispute'),
                        ModalAction.SEND_DEAL_TO_DISPUTE,
                      )
                    }>
                    {i18n.t('information.toDisputeButton')}
                  </Button>
                )}
              </div>
              {dealInfo.role === DealRole.Taker && (
                <Button
                  buttonColor={ButtonTypes.gray}
                  onClick={() =>
                    triggerConfirmModal(
                      i18n.t('information.cancel'),
                      ModalAction.CANCEL_DEAL,
                    )
                  }>
                  {i18n.t('information.cancelButton')}
                </Button>
              )}
            </div>
          )}

        {/* InReview */}

        {dealInfo.role === DealRole.Maker &&
          dealInfo.state === DealState.InReview && (
            <div className={styles.approveParticipation}>
              <div className={styles.leftBlock}>
                <Button
                  buttonColor={ButtonTypes.violet}
                  onClick={() =>
                    triggerConfirmModal(
                      i18n.t('information.release'),
                      ModalAction.RELEASE_DEAL,
                    )
                  }>
                  {i18n.t('information.releaseButton')}
                </Button>
                <Button
                  buttonColor={ButtonTypes.light}
                  onClick={() =>
                    triggerConfirmModal(
                      i18n.t('information.toDispute'),
                      ModalAction.SEND_DEAL_TO_DISPUTE,
                    )
                  }>
                  {i18n.t('information.toDisputeButton')}
                </Button>
              </div>
            </div>
          )}

        {/* InDispute */}

        {dealInfo.role === DealRole.Arbiter &&
          dealInfo.state === DealState.InDispute && (
            <div className={styles.disputeBlock}>
              <h2>{i18n.t('information.result')}</h2>
              <div className={styles.inputBlock}>
                <form
                  onSubmit={handleSubmit(data => onSubmitResolveDispute(data))}>
                  <Input
                    label={i18n.t('information.amountToTaker')}
                    error={errors.amountToMaker?.message}
                    disabled
                    {...register('amountToMaker', {
                      required: i18n.t('validation.required'),
                    })}
                  />
                  <Input
                    label={i18n.t('information.amountToMaker')}
                    error={errors.amountToTaker?.message}
                    {...register('amountToTaker', {
                      required: i18n.t('validation.required'),
                      min: {
                        message: i18n.t('validation.min'),
                        value: 0,
                      },
                      max: {
                        message: i18n.t('validation.max', {
                          amount: dealInfo.amount.toString(),
                        }),
                        value: dealInfo.amount,
                      },
                    })}
                  />
                  <Button buttonColor={ButtonTypes.violet}>
                    {i18n.t('information.button')}
                  </Button>
                </form>
              </div>
            </div>
          )}

        {/* Resolved */}

        {dealInfo.state === DealState.Resolved && (
          <div className={styles.disputeBlock}>
            <h2>{i18n.t('information.result')}</h2>
            <div className={styles.informationRow}>
              <h4>{i18n.t('information.resultAmountToTaker')}</h4>
              <h5>{dealInfo.feeInfo.arbiterSentToTaker} WEI</h5>
            </div>
            <div className={styles.informationRow}>
              <h4>{i18n.t('information.resultAmountToMaker')}</h4>
              <h5>
                {dealInfo.amount - dealInfo.feeInfo.arbiterSentToTaker} WEI
              </h5>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        confirmModalFn={() => onModalConfirm()}
        closeModalFn={() => closeConfirmModal()}
        confirmText={confirmModalMessage ?? ''}
      />
    </div>
  );
}
