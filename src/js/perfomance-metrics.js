export function getPerfomanceMetrics() {
	const [navEntries] = performance.getEntriesByType('navigation');
	
	const pageLoadingTime = navEntries.domComplete - navEntries.unloadEventStart;

	const fetchStartTime = performance.getEntriesByName("fetchStartTime")[0];
	const fetchEndTime = performance.getEntriesByName("fetchEndTime")[0];

	const fetchPerfomance = fetchEndTime.startTime - fetchStartTime.startTime;
	
	const memoryUsage = performance.memory.usedJSHeapSize;

	const report = [
		{pageLoadingTime: pageLoadingTime},
		{fetchPerfomance: fetchPerfomance},
		{memoryUsage: memoryUsage}];

	return report;
}
