# // ###########################################################################
# // Queries
# // ###########################################################################

# -> get one column as a list
allFunctionNames = staticContexts[['displayName']].to_numpy().flatten().tolist()

# -> get all rows that match a condition
callLinked = staticTraces[~staticTraces['callId'].isin([0])]

# -> exclude columns
df.drop(['A', 'B'], axis=1)

# -> complex queries
staticTraces.query(f'callId == {callId} or resultCallId == {callId}')

# -> join queries
# https://stackoverflow.com/a/40869861
B.query('client_id not in @A.client_id')
B[~B.client_id.isin(A.client_id)]

# // ###########################################################################
# // Display
# // ###########################################################################

# -> display a groupby object (https://stackoverflow.com/questions/22691010/how-to-print-a-groupby-object)
for key, item in df.groupby('A'):
  display(grouped_df.get_group(key))