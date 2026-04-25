const MOBILE_OS_RE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

const getConnection = () => {
  if (typeof navigator === 'undefined') return null;
  return navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
};

const getMatch = (query) => {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(query).matches;
};

const getOs = (userAgent) => {
  if (/Android/i.test(userAgent)) return 'android';
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'ios';
  if (/Windows/i.test(userAgent)) return 'windows';
  if (/Mac OS X|Macintosh/i.test(userAgent)) return 'macos';
  if (/Linux/i.test(userAgent)) return 'linux';
  return 'unknown';
};

const getAndroidMajorVersion = (userAgent) => {
  const match = userAgent.match(/Android\s([0-9]+)/i);
  return match ? Number(match[1]) : null;
};

export const detectDevicePerformance = () => {
  if (typeof window === 'undefined') {
    return {
      os: 'unknown',
      tier: 'high',
      animationLevel: 'full',
      isMobile: false,
      isTablet: false,
      shouldUseWebGL: true,
      shouldUseScrollEffects: true,
      shouldUseCssMotion: true,
    };
  }

  const nav = window.navigator || {};
  const userAgent = nav.userAgent || '';
  const connection = getConnection();
  const memory = typeof nav.deviceMemory === 'number' ? nav.deviceMemory : null;
  const cores = typeof nav.hardwareConcurrency === 'number' ? nav.hardwareConcurrency : null;
  const pixelRatio = window.devicePixelRatio || 1;
  const width = Math.min(window.innerWidth || 0, window.screen?.width || Number.MAX_SAFE_INTEGER);
  const reducedMotion = getMatch('(prefers-reduced-motion: reduce)');
  const coarsePointer = getMatch('(pointer: coarse)');
  const mobileOs = MOBILE_OS_RE.test(userAgent);
  const isTablet = /iPad|Tablet/i.test(userAgent) || (coarsePointer && width >= 768 && width <= 1366);
  const isMobile = mobileOs || (coarsePointer && width <= 1024);
  const os = getOs(userAgent);
  const androidMajor = getAndroidMajorVersion(userAgent);
  const saveData = Boolean(connection?.saveData);
  const effectiveType = connection?.effectiveType || '';

  const veryLowMemory = memory !== null && memory <= 2;
  const lowMemory = memory !== null && memory <= 4;
  const lowCores = cores !== null && cores <= 4;
  const mediumCores = cores !== null && cores <= 6;
  const constrainedNetwork = saveData || effectiveType === 'slow-2g' || effectiveType === '2g';
  const oldAndroid = os === 'android' && androidMajor !== null && androidMajor <= 9;
  const highDprBudget = isMobile && pixelRatio >= 3 && (lowCores || lowMemory || memory === null);

  const shouldBeStatic =
    reducedMotion ||
    constrainedNetwork ||
    veryLowMemory ||
    (isMobile && lowCores && lowMemory) ||
    (isMobile && lowCores && memory === null) ||
    oldAndroid ||
    highDprBudget;

  const shouldBeReduced =
    shouldBeStatic ||
    isMobile ||
    isTablet ||
    lowMemory ||
    mediumCores;

  const tier = shouldBeStatic ? 'low' : shouldBeReduced ? 'medium' : 'high';
  const animationLevel = shouldBeStatic ? 'static' : shouldBeReduced ? 'reduced' : 'full';

  return {
    os,
    tier,
    animationLevel,
    isMobile,
    isTablet,
    memory,
    cores,
    pixelRatio,
    reducedMotion,
    saveData,
    effectiveType,
    shouldUseWebGL: animationLevel === 'full' && !isMobile,
    shouldUseScrollEffects: animationLevel !== 'static',
    shouldUseCssMotion: animationLevel !== 'static',
  };
};

export const applyDevicePerformanceClass = (profile = detectDevicePerformance()) => {
  if (typeof document === 'undefined') return profile;

  const root = document.documentElement;
  root.classList.remove('perf-full', 'perf-reduced', 'perf-static');
  root.classList.add(`perf-${profile.animationLevel}`);
  root.dataset.deviceTier = profile.tier;
  root.dataset.deviceOs = profile.os;
  root.dataset.animationLevel = profile.animationLevel;

  return profile;
};
