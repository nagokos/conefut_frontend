import { memo, useState, VFC } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useSize } from '../../hooks/index';
import { styled } from '@mui/material/styles';

type Competition = {
  name: string;
  value: number;
};

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    textColor="secondary"
    {...props}
    variant="scrollable"
    scrollButtons="auto"
    TabIndicatorProps={{
      children: <span className="MuiTabs-indicatorSpanShort" />,
    }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpanShort': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: 'black',
  },
});

export const TabCompetition: VFC = memo(() => {
  const competitions: Competition[] = [
    { name: 'サッカー', value: 0 },
    { name: 'フットサル', value: 1 },
    { name: 'ソサイチ', value: 2 },
    { name: '大会開催', value: 3 },
  ];
  const [value, setValue] = useState<number>(0);
  const [tab, setTab] = useState<number | null>(null);
  const { isMobile } = useSize();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabMove = (target: number) => {
    setTab(target);
  };

  const tabLeave = () => {
    setTab(null);
  };

  return (
    <Box ml={isMobile ? 1 : 4}>
      <StyledTabs value={value} onChange={handleChange}>
        {competitions.map((competition: Competition) => (
          <Tab
            onMouseMove={() => tabMove(competition.value)}
            onMouseLeave={tabLeave}
            key={competition.value}
            value={competition.value}
            disableRipple
            sx={{ fontWeight: 'bold', color: tab === competition.value ? 'black' : '' }}
            label={competition.name}
          />
        ))}
      </StyledTabs>
    </Box>
  );
});
