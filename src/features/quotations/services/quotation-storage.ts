import { mockQuotations } from "../data/quotations";
import type {
  CreateQuotationInput,
  Quotation,
  QuotationItem,
} from "../types/quotation";

export const QUOTATIONS_STORAGE_KEY = "mecsu-quotations";

function isBrowser() {
  return typeof window !== "undefined";
}

function formatDate(date: Date) {
  return date.toLocaleDateString("vi-VN");
}

function generateQuotationCode() {
  const now = new Date();
  const year = now.getFullYear();
  const suffix = `${now.getTime()}`.slice(-6);
  return `BG-${year}-${suffix}`;
}

function createQuotationItem(
  item: CreateQuotationInput["items"][number],
  index: number,
): QuotationItem {
  return {
    id: `qi-new-${Date.now()}-${index}`,
    image: "https://placehold.co/120x120/F6F8FB/163F78?text=RFQ",
    name: item.productName,
    sku: item.productCode || `SKU-${Date.now()}-${index}`,
    quantity: item.quantity,
    unit: item.unit,
    unitPrice: 0,
    discount: 0,
    vat: 0,
    lineTotal: 0,
    notes: item.notes,
  };
}

export function createQuotationFromRequest(input: CreateQuotationInput): Quotation {
  const now = new Date();
  const expiryDate = input.desiredDeadline
    ? new Date(input.desiredDeadline)
    : new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  return {
    id: `q-new-${Date.now()}`,
    code: generateQuotationCode(),
    status: "pending",
    requestDate: formatDate(now),
    quotationDate: "",
    expiryDate: Number.isNaN(expiryDate.getTime()) ? "" : formatDate(expiryDate),
    productCount: input.items.length,
    supplierCount: 0,
    subtotal: 0,
    discountTotal: 0,
    vatTotal: 0,
    shippingFee: 0,
    total: 0,
    estimatedValue: 0,
    items: input.items.map(createQuotationItem),
    salesRep: {
      name: "MECSU Sales Team",
      role: "Đội ngũ kinh doanh",
      email: "sales@mecsu.vn",
    },
    requestName: input.requestName,
    priority: input.priority,
    generalNotes: input.generalNotes,
    attachmentNames: input.attachmentNames,
    contactInfo: input.contactInfo,
  };
}

function readRawQuotations(): Quotation[] | null {
  if (!isBrowser()) return null;

  try {
    const rawValue = window.localStorage.getItem(QUOTATIONS_STORAGE_KEY);
    if (!rawValue) return null;
    const parsed = JSON.parse(rawValue) as Quotation[];
    if (!Array.isArray(parsed)) return null;

    return parsed.filter((item) => item && item.id && item.code && item.requestName);
  } catch {
    return null;
  }
}

export function initializeQuotations() {
  if (!isBrowser()) return;
  if (window.localStorage.getItem(QUOTATIONS_STORAGE_KEY) === null) {
    saveQuotations(mockQuotations);
  }
}

export function loadQuotations(): Quotation[] {
  return readRawQuotations() ?? mockQuotations;
}

export function findQuotationById(id: string): Quotation | undefined {
  return loadQuotations().find((quotation) => quotation.id === id);
}

export function saveQuotations(quotations: Quotation[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(QUOTATIONS_STORAGE_KEY, JSON.stringify(quotations));
}

export function addQuotation(quotation: Quotation) {
  const nextQuotations = [quotation, ...loadQuotations()];
  saveQuotations(nextQuotations);
  return nextQuotations;
}

export function updateQuotation(updatedQuotation: Quotation) {
  const nextQuotations = loadQuotations().map((quotation) =>
    quotation.id === updatedQuotation.id ? updatedQuotation : quotation,
  );
  saveQuotations(nextQuotations);
  return updatedQuotation;
}
