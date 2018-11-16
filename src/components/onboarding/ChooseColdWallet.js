import React from 'react';
import {
  Grid,
  Card,
  Box,
  Text,
  Button,
  Link,
  Address,
  Flex,
  Table,
  Checkbox
} from '@makerdao/ui-components';

import faqs from './faqs';

import LedgerStep from './LedgerStep';
import Sidebar from './Sidebar';
import WalletIcon from './WalletIcon';
import H2 from './H2';
import Step from './Step';
import ButtonCard from './ButtonCard';
import ChooseMKRBalanceStep from './ChooseMKRBalanceStep';

import linkImg from '../../imgs/onboarding/link.svg';

const SelectAWalletStep = ({ active, onTrezorSelected, onLedgerSelected }) => {
  return (
    <Step active={active}>
      <Grid gridRowGap="m" alignContent="start">
        <Box textAlign="center" mt={[0, 0, 0, 'l']}>
          <Box mb="s">
            <H2>Select a cold wallet</H2>
          </Box>
          <Text t="p2">
            <p>
              Select the cold wallet that holds your MKR. This selection will
              enable you to vote and will not relinquish the custody that you
              have over your MKR.
            </p>
          </Text>
        </Box>
        <ButtonCard
          icon={<WalletIcon provider="trezor" />}
          title="Trezor"
          subtitle="Connect via USB and unlock."
          onNext={onTrezorSelected}
        />
        <ButtonCard
          icon={<WalletIcon provider="ledger" />}
          title="Ledger"
          subtitle="Open and unlock wallet."
          onNext={onLedgerSelected}
        />
      </Grid>
    </Step>
  );
};

const ConfirmWalletStep = ({ active, onConfirm, onCancel }) => {
  return (
    <Step active={active}>
      <Grid gridRowGap="m" alignContent="start">
        <Text textAlign="center">
          <H2>Link hot and cold wallet</H2>
        </Text>
        <Text t="p2" textAlign="center">
          <p>
            Linking your hot and cold wallet will enable you to vote while your
            MKR is still stored in your cold wallet.
          </p>
        </Text>
        <Grid>
          <Card p="m" gridColumn="1/3">
            <Grid
              alignItems="center"
              gridTemplateColumns={['auto 1fr auto', 'auto 1fr 1fr auto']}
              gridColumnGap="s"
            >
              <Box>
                <WalletIcon provider="trezor" />
              </Box>
              <Box>
                <Link fontWeight="semibold">
                  <Address
                    show={active}
                    full="0x99cb784f0429efd72wu39fn4256n8wud4e01c7d2"
                    shorten
                  />
                </Link>
              </Box>
              <Box gridRow={['2', '1']} gridColumn={['1/3', '3']}>
                94.2 ETH, 142.4 MKR
              </Box>
              <Box
                borderRadius="4px"
                color="#447AFB"
                bg="#EAF0FF"
                fontSize="1.2rem"
                fontWeight="bold"
                px="xs"
              >
                COLD WALLET
              </Box>
            </Grid>
          </Card>
          <Box gridColumn="1" mb="-7px" justifySelf="center">
            <img src={linkImg} alt="" />
          </Box>
          <Box
            gridColumn="2"
            alignSelf="center"
            fontWeight="medium"
            color="#48495F"
          >
            <p>You are linking the above cold wallet to the below hot wallet</p>
          </Box>
          <Card p="m" gridColumn="1/3">
            <Grid
              alignItems="center"
              gridTemplateColumns={['auto 1fr auto', 'auto 1fr 1fr auto']}
              gridColumnGap="s"
            >
              <Box>
                <WalletIcon provider="trezor" />
              </Box>
              <Box>
                <Link fontWeight="semibold">
                  <Address
                    show={active}
                    full="0x99cb784f0429efd72wu39fn4256n8wud4e01c7d2"
                    shorten
                  />
                </Link>
              </Box>
              <Box gridRow={['2', '1']} gridColumn={['1/3', '3']}>
                94.2 ETH, 142.4 MKR
              </Box>
              <Box
                borderRadius="4px"
                color="#E45432"
                bg="#FFE2D9"
                fontSize="1.2rem"
                fontWeight="bold"
                px="xs"
              >
                HOT WALLET
              </Box>
            </Grid>
          </Card>
        </Grid>
        <Grid
          gridRowGap="xs"
          gridColumnGap="s"
          gridTemplateColumns={['1fr', 'auto auto']}
          justifySelf={['stretch', 'center']}
        >
          <Button variant="secondary-outline" onClick={onCancel}>
            Change wallet
          </Button>
          <Button onClick={onConfirm}>Link wallets</Button>
        </Grid>
      </Grid>
    </Step>
  );
};

class ChooseColdWallet extends React.Component {
  constructor(props) {
    super(props);

    this.steps = {
      SELECT_WALLET: 'SELECT_WALLET',
      SELECT_LEDGER_WALLET: 'SELECT_LEDGER_WALLET',
      SELECT_MKR_BALANCE: 'SELECT_MKR_BALANCE',
      CONFIRM_WALLET: 'CONFIRM_WALLET'
    };

    this.state = {
      step: this.steps.SELECT_WALLET,
      faqs: faqs.coldWallet
    };

    this.confirmWallet = this.confirmWallet.bind(this);
    this.selectAWallet = this.selectAWallet.bind(this);
    this.selectLedgerWallet = this.selectLedgerWallet.bind(this);
    this.selectMKRBalance = this.selectMKRBalance.bind(this);
  }

  selectAWallet() {
    this.setState({
      step: this.steps.SELECT_WALLET,
      faqs: faqs.coldWallet
    });
  }

  selectLedgerWallet() {
    this.setState({
      step: this.steps.SELECT_LEDGER_WALLET,
      faqs: faqs.ledger
    });
  }

  selectMKRBalance() {
    this.setState({
      step: this.steps.SELECT_MKR_BALANCE,
      faqs: faqs.selectMKRBalance
    });
  }

  confirmWallet() {
    this.setState({
      step: this.steps.CONFIRM_WALLET,
      faqs: faqs.selectMKRBalance
    });
  }

  render() {
    return (
      <Box maxWidth="930px" m="0 auto">
        <Grid
          gridColumnGap="xl"
          gridRowGap="m"
          gridTemplateColumns={['1fr', '1fr', 'auto 340px']}
        >
          <div>
            <SelectAWalletStep
              active={this.state.step === this.steps.SELECT_WALLET}
              onTrezorSelected={this.selectMKRBalance}
              onLedgerSelected={this.selectLedgerWallet}
            />
            <LedgerStep
              active={this.state.step === this.steps.SELECT_LEDGER_WALLET}
              onLedgerLive={this.selectMKRBalance}
              onLedgerLegacy={this.confirmWallet}
              onCancel={this.selectAWallet}
            />
            <ChooseMKRBalanceStep
              active={this.state.step === this.steps.SELECT_MKR_BALANCE}
              accounts={[]}
              onAddressSelected={this.confirmWallet}
              onCancel={this.selectAWallet}
            />
            <ConfirmWalletStep
              active={this.state.step === this.steps.CONFIRM_WALLET}
              onConfirm={this.props.onComplete}
              onCancel={this.selectAWallet}
            />
          </div>
          <Sidebar
            faqs={this.state.faqs}
            hotWalletAddress={this.props.hotWalletAddress}
          />
        </Grid>
      </Box>
    );
  }
}

export default ChooseColdWallet;
