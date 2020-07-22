import React from 'react';
import { Box, Flex, space, themeColor, color } from '@blockstack/ui';
import { border } from '@common/utils';
import { Link } from '@components/mdx';
import { Text } from '@components/typography';
import fetch from 'isomorphic-unfetch';
import { CheckmarkCircleIcon, ExclamationMarkCircleIcon } from '@blockstack/ui';

export const StatusCheck: React.FC<any> = () => {
  const [status, setStatus] = React.useState(false);
  const STATUS_CHECKER_URL = 'https://status-checker-blockstack.herokuapp.com';

  React.useEffect(() => {
    fetch(`${STATUS_CHECKER_URL}/json`)
      .then(r => r.json())
      .then(data => {
        if (data && data.masterNodePings.length > 1) {
          setStatus(data.masterNodePings[0].value === 1);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Link href={STATUS_CHECKER_URL} target="_blank" textDecoration="none">
      <Box pt={space('base-loose')} px={space('base')} display={['none', 'none', 'block', 'block']}>
        <Flex
          border={border()}
          borderRadius="6px"
          px={space('base-tight')}
          py={space('tight')}
          align="center"
          _hover={{ borderColor: themeColor('blue.400'), cursor: 'pointer' }}
        >
          <Box mr={space('tight')}>
            {status ? (
              <CheckmarkCircleIcon
                color={themeColor('feedback.success')}
                h="20px"
                w="20px"
                alignItems="center"
                justifyContent="center"
              />
            ) : (
              <ExclamationMarkCircleIcon
                color={themeColor('feedback.error')}
                h="20px"
                w="20px"
                alignItems="center"
                justifyContent="center"
              />
            )}
          </Box>
          <Text fontSize={'14px'} color={themeColor('ink.600')}>
            Stacks 2.0 Network is {status ? 'online' : 'offline'}
          </Text>
        </Flex>
      </Box>
    </Link>
  );
};

export default StatusCheck;
