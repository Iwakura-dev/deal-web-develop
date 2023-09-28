import React, {useCallback, useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useEndlessRepeater, useTronWebService} from '../common/hooks';
import ButtonLink from '../components/common/ButtonLink';
import {LoaderSmall} from '../components/common/LoaderSmall';
import {PageStatusesEnum} from '../components/common/PageStatuses/pageStatuses.types';
import Row from '../components/common/Row';
import Table from '../components/common/Table';
import Status from '../components/Status';
import {TABLE_COLUMN} from '../constants';
import {useI18n} from '../i18n';
import PlusIcon from '../icons/PlusIcon';
import {LoadingState, useCryptoStore} from '../store/cryptoStore';
import styles from './styles.module.scss';

export default function Deals() {
  const i18n = useI18n();
  const {
    profile,
    dealInfoListLoadingState,
    fetchDealInfoList,
    silentUpdateDealInfoList,
    dealInfoList,
    dealInfoTotalCount,
    dealInfoLimit,
    dealInfoOffset,
    setDealInfoOffset,
  } = useCryptoStore(state => state);
  const tronWebService = useTronWebService();
  const isWalletConnected = useCryptoStore(state => !!state.profile.address);

  const endlessFetch = useCallback(
    async (limit: number, offset: number) => {
      if (tronWebService && isWalletConnected) {
        await silentUpdateDealInfoList(tronWebService, limit, offset);
      }
    },
    [tronWebService, isWalletConnected],
  );

  useEndlessRepeater(3000, () => {
    void endlessFetch(dealInfoLimit, dealInfoOffset);
  });

  const initFetch = useCallback(
    async (limit: number, offset: number) => {
      if (tronWebService && isWalletConnected) {
        await fetchDealInfoList(tronWebService, limit, offset);
      }
    },
    [profile, tronWebService],
  );

  const next = useCallback(async () => {
    const newOffset = dealInfoOffset + dealInfoLimit;
    setDealInfoOffset(newOffset);
    void initFetch(dealInfoLimit, newOffset);
  }, [profile, tronWebService, dealInfoLimit, dealInfoOffset]);

  useEffect(() => {
    void initFetch(dealInfoLimit, dealInfoOffset);
  }, [initFetch, dealInfoLimit, dealInfoOffset]);

  if (!profile.address) {
    return <Status status={PageStatusesEnum.connectWallet} />;
  }

  if (dealInfoListLoadingState === LoadingState.FAILED)
    return <Status status={PageStatusesEnum.serverError} />;

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h2>
          {i18n.t('common.deals')} <span>({dealInfoTotalCount})</span>
        </h2>
        <ButtonLink href={'/create'}>
          <PlusIcon />
          {i18n.t('common.createDeal')}
        </ButtonLink>
      </div>
      <div>
        <InfiniteScroll
          next={next}
          hasMore={dealInfoLimit + dealInfoOffset < dealInfoTotalCount}
          dataLength={dealInfoList.length}
          loader={<></>}
          scrollableTarget="scrollable">
          <Table columnNames={TABLE_COLUMN}>
            {dealInfoList.map(dealInfo => {
              return <Row key={dealInfo.id} dealInfo={dealInfo} />;
            })}
          </Table>
          {dealInfoListLoadingState === LoadingState.PENDING && <LoaderSmall />}
        </InfiniteScroll>
      </div>
    </div>
  );
}
