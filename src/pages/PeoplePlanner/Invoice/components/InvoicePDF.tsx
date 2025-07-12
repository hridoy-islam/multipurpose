import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment';
import { Invoice } from '../types/InvoiceTypes';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: '2 solid #E5E7EB',
  },
  companyInfo: {
    flexDirection: 'column',
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  companyDetails: {
    fontSize: 10,
    color: '#6B7280',
    lineHeight: 1.4,
  },
  invoiceInfo: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  invoiceNumber: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  billTo: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  clientInfo: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.4,
  },
  invoiceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  detailColumn: {
    flexDirection: 'column',
  },
  detailLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 12,
    color: '#1F2937',
    fontWeight: 'bold',
  },
  table: {
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: '8 8 0 0',
  },
  tableHeaderCell: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottom: '1 solid #E5E7EB',
  },
  tableCell: {
    fontSize: 10,
    color: '#374151',
  },
  tableCellBold: {
    fontSize: 10,
    color: '#1F2937',
    fontWeight: 'bold',
  },
  // Column widths
  col1: { width: '15%' },
  col2: { width: '25%' },
  col3: { width: '20%' },
  col4: { width: '10%' },
  col5: { width: '15%' },
  col6: { width: '15%' },
  
  summary: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#374151',
  },
  summaryValue: {
    fontSize: 11,
    color: '#1F2937',
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    marginTop: 10,
    paddingTop: 10,
    borderTop: '2 solid #1F2937',
  },
  totalLabel: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTop: '1 solid #E5E7EB',
  },
  footerText: {
    fontSize: 9,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 1.4,
  },
  status: {
    position: 'absolute',
    top: 30,
    right: 30,
    padding: '8 16',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  statusPaid: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
  },
  statusOverdue: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
  },
});

interface InvoicePDFProps {
  invoice: Invoice;
}

const InvoicePDF: React.FC<InvoicePDFProps> = ({ invoice }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'paid':
        return [styles.status, styles.statusPaid];
      case 'pending':
        return [styles.status, styles.statusPending];
      case 'overdue':
        return [styles.status, styles.statusOverdue];
      default:
        return [styles.status, styles.statusPending];
    }
  };

  const getTotalHours = () => {
    return invoice.items.reduce((total, item) => total + item.hours, 0);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Status Badge */}
        <View style={getStatusStyle(invoice.status)}>
          <Text>{invoice.status.toUpperCase()}</Text>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>Healthcare Services Ltd.</Text>
            <Text style={styles.companyDetails}>
              123 Healthcare Avenue{'\n'}
              Medical District, City{'\n'}
              Postal Code: 12345{'\n'}
              Phone: +44 20 1234 5678{'\n'}
              Email: billing@healthcareservices.com
            </Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>#{invoice.invoiceNumber}</Text>
          </View>
        </View>

        {/* Bill To */}
        <View style={styles.billTo}>
          <Text style={styles.sectionTitle}>Bill To:</Text>
          <Text style={styles.clientInfo}>
            {invoice.serviceUserName}{'\n'}
            {invoice.serviceUserAddress}{'\n'}
            Email: {invoice.serviceUserEmail}{'\n'}
            Phone: {invoice.serviceUserPhone}
          </Text>
        </View>

        {/* Invoice Details */}
        <View style={styles.invoiceDetails}>
          <View style={styles.detailColumn}>
            <Text style={styles.detailLabel}>Invoice Date</Text>
            <Text style={styles.detailValue}>
              {moment(invoice.invoiceDate).format('MMMM DD, YYYY')}
            </Text>
          </View>
          <View style={styles.detailColumn}>
            <Text style={styles.detailLabel}>Due Date</Text>
            <Text style={styles.detailValue}>
              {moment(invoice.dueDate).format('MMMM DD, YYYY')}
            </Text>
          </View>
          <View style={styles.detailColumn}>
            <Text style={styles.detailLabel}>Service Period</Text>
            <Text style={styles.detailValue}>
              {moment(invoice.periodStart).format('MMM DD')} - {moment(invoice.periodEnd).format('MMM DD, YYYY')}
            </Text>
          </View>
          <View style={styles.detailColumn}>
            <Text style={styles.detailLabel}>Total Hours</Text>
            <Text style={styles.detailValue}>{getTotalHours()}h</Text>
          </View>
        </View>

        {/* Services Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.col1]}>Date</Text>
            <Text style={[styles.tableHeaderCell, styles.col2]}>Carer</Text>
            <Text style={[styles.tableHeaderCell, styles.col3]}>Service Type</Text>
            <Text style={[styles.tableHeaderCell, styles.col4]}>Hours</Text>
            <Text style={[styles.tableHeaderCell, styles.col5]}>Rate</Text>
            <Text style={[styles.tableHeaderCell, styles.col6]}>Amount</Text>
          </View>
          
          {invoice.items.map((item, index) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.col1]}>
                {moment(item.date).format('MMM DD')}
              </Text>
              <Text style={[styles.tableCell, styles.col2]}>{item.carerName}</Text>
              <Text style={[styles.tableCell, styles.col3]}>{item.serviceType}</Text>
              <Text style={[styles.tableCellBold, styles.col4]}>{item.hours}h</Text>
              <Text style={[styles.tableCell, styles.col5]}>${item.hourlyRate}/h</Text>
              <Text style={[styles.tableCellBold, styles.col6]}>${item.amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>${invoice.subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax ({(invoice.taxRate * 100).toFixed(1)}%):</Text>
            <Text style={styles.summaryValue}>${invoice.tax.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>${invoice.total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Notes */}
        {invoice.notes && (
          <View style={{ marginTop: 30 }}>
            <Text style={styles.sectionTitle}>Notes:</Text>
            <Text style={styles.clientInfo}>{invoice.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you for choosing Healthcare Services Ltd.{'\n'}
            Payment is due within 30 days of invoice date.{'\n'}
            For questions about this invoice, please contact our billing department.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;